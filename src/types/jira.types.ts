export interface JiraProject {
  key: string;
}

export interface JiraIssueType {
  name: string;
}

export interface JiraAdfContent {
  type: string;
  text?: string;
  content?: JiraAdfContent[];
}

export interface JiraAdfDocument {
  type: 'doc';
  version: 1;
  content: JiraAdfContent[];
}

export interface JiraIssueFields {
  project: JiraProject;
  issuetype: JiraIssueType;
  summary: string;
  description: JiraAdfDocument;
}

export interface JiraIssueRequest {
  fields: JiraIssueFields;
}

export interface JiraCommentRequest {
  body: JiraAdfDocument;
}

/** Helper to create ADF text node */
export function createTextNode(text: string): JiraAdfContent {
  return { type: 'text', text };
}

/** Helper to create ADF paragraph */
export function createParagraph(text: string): JiraAdfContent {
  return { type: 'paragraph', content: [createTextNode(text)] };
}

/** Helper to create simple ADF document */
export function createSimpleDocument(text: string): JiraAdfDocument {
  return { type: 'doc', version: 1, content: [createParagraph(text)] };
}

/** Helper to build a JiraIssueRequest */
export function createJiraIssueRequest(
  projectKey: string,
  issueType: string,
  summary: string,
  description: string,
): JiraIssueRequest {
  return {
    fields: {
      project: { key: projectKey },
      issuetype: { name: issueType },
      summary,
      description: createSimpleDocument(description),
    },
  };
}

/** Helper to build a JiraCommentRequest */
export function createJiraCommentRequest(commentText: string): JiraCommentRequest {
  return { body: createSimpleDocument(commentText) };
}
