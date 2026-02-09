import { APIRequestContext } from '@playwright/test';
import { ApiHelper } from '../utils/api.helper.js';
import { EnvConfig } from '../config/env.config.js';
import { jiraApiUrl } from '../utils/url.helper.js';
import {
  createJiraIssueRequest,
  createJiraCommentRequest,
} from '../types/jira.types.js';
import { JIRA, POLL } from '../config/constants.js';

export class JiraApi {
  private readonly api: ApiHelper;

  constructor(request: APIRequestContext) {
    this.api = new ApiHelper(request);
  }

  /** Create a JIRA issue with login scenario details */
  async createJiraIssue(): Promise<{ issueKey: string; issueId: string }> {
    const uniqueSummary = `${JIRA.loginScenarioSummary} - ${Math.random().toString(36).substring(2, 10)}`;
    const request = createJiraIssueRequest(
      EnvConfig.jiraProjectKey,
      'Task',
      uniqueSummary,
      JIRA.loginScenarioDescription,
    );

    const url = jiraApiUrl('/issue');
    const { status, body } = await this.api.postWithBasicAuth<{ key: string; id: string }>(
      url,
      request,
      EnvConfig.jiraEmail,
      EnvConfig.jiraApiToken,
    );

    if (status !== 201) {
      throw new Error(`Failed to create JIRA issue. Status: ${status}`);
    }

    return { issueKey: body.key, issueId: body.id };
  }

  /** Add @TestMu AI Cloud trigger comment */
  async addTestMuTriggerComment(issueKey: string): Promise<void> {
    const request = createJiraCommentRequest(JIRA.testMuTriggerComment);
    const url = jiraApiUrl(`/issue/${issueKey}/comment`);
    const { status } = await this.api.postWithBasicAuth<unknown>(
      url,
      request,
      EnvConfig.jiraEmail,
      EnvConfig.jiraApiToken,
    );

    if (status !== 201) {
      throw new Error(`Failed to add comment. Status: ${status}`);
    }
  }

  /** Poll for LambdaTest AI Cloud response comment */
  async waitForLambdaTestAIResponse(issueKey: string): Promise<{ found: boolean; link: string | null }> {
    let elapsed = 0;
    while (elapsed < POLL.maxWaitSeconds) {
      const comments = await this.getIssueComments(issueKey);
      for (const comment of comments) {
        const text = this.extractTextFromComment(comment);
        if (text?.includes(JIRA.lambdatestAiResponsePrefix)) {
          const link = this.extractLinkFromText(text);
          return { found: true, link };
        }
      }
      await new Promise((r) => setTimeout(r, POLL.intervalSeconds * 1000));
      elapsed += POLL.intervalSeconds;
    }
    return { found: false, link: null };
  }

  /** Get all comments for a JIRA issue */
  async getIssueComments(issueKey: string): Promise<Record<string, unknown>[]> {
    const url = jiraApiUrl(`/issue/${issueKey}/comment`);
    const { status, body } = await this.api.getWithBasicAuth<{ comments: Record<string, unknown>[] }>(
      url,
      EnvConfig.jiraEmail,
      EnvConfig.jiraApiToken,
    );
    return status === 200 ? body.comments : [];
  }

  /** Extract text from ADF comment */
  private extractTextFromComment(comment: Record<string, unknown>): string | null {
    try {
      const body = comment.body as Record<string, unknown> | undefined;
      if (!body) return null;
      const content = body.content as Record<string, unknown>[] | undefined;
      if (!content) return null;
      const parts: string[] = [];
      this.extractTextRecursively(content, parts);
      return parts.join('');
    } catch {
      return null;
    }
  }

  private extractTextRecursively(content: Record<string, unknown>[], parts: string[]): void {
    for (const node of content) {
      if (node.type === 'text' && typeof node.text === 'string') {
        parts.push(node.text);
      }
      if ((node.type === 'inlineCard' || node.type === 'link') && node.attrs) {
        const attrs = node.attrs as Record<string, unknown>;
        if (attrs.url) parts.push(` ${attrs.url} `);
      }
      if (Array.isArray(node.content)) {
        this.extractTextRecursively(node.content as Record<string, unknown>[], parts);
      }
      if (Array.isArray(node.marks)) {
        for (const mark of node.marks as Record<string, unknown>[]) {
          if (mark.type === 'link' && mark.attrs) {
            const attrs = mark.attrs as Record<string, unknown>;
            if (attrs.href) parts.push(` ${attrs.href} `);
          }
        }
      }
    }
  }

  /** Extract URL from text */
  private extractLinkFromText(text: string): string | null {
    const match = text.match(/(https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+)/);
    return match?.[1] ?? null;
  }
}
