# Getting Started With Scim User Provisioning

> **Source**: [https://www.testmuai.com/support/docs/scim](https://www.testmuai.com/support/docs/scim)

**Product**: Settings and Security

**Last Crawled**: 2026-01-27T20:47:21.474874

---

On this page

The SCIM specification is designed to make managing user identities easier. SCIM allows your Identity Provider (IdP) to manage users within your TestMu AI workspace

> SSO must be integrated before enabling SCIM. Please see [Getting Started With Single Sign On (SSO)](https://www.testmuai.com/support/docs/single-sign-on/) or [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#53202623233c212713273620273e267d323a) for questions.

## Benefits Of SCIM[â](https://www.testmuai.com/support/docs/scim#benefits-of-scim "Direct link to Benefits Of SCIM")

Here are the following benefits of integrating SCIM with TestMu AI:

  * **Efficiency and Automation** : SCIM automates the process of user identity management, making it more efficient and less error-prone. It enables automatic provisioning and de-provisioning of user accounts, reducing manual administrative tasks and associated errors.
  * **Consistency:** : SCIM ensures that user data is consistent across different systems and services. When a user's attributes (like role) are updated in the identity provider, SCIM can be used to propagate those changes to all connected service providers, maintaining accurate and up-to-date information.
  * **Security and Access Control:** : By centralizing identity management through SCIM, organizations can better enforce access control policies and ensure that users have appropriate access rights to the resources they need. This can help mitigate security risks associated with improper access permissions.
  * **Assigning Groups to Users (If Groups Are Activated in Your Organization) :** If your organization has group functionality enabled, you can assign existing TestMu AI groups to users provisioned through an Identity Provider (IdP) such as Microsoft Azure AD, Okta, and others using SCIM.

> Connect with our [24/7 customer support](https://www.testmuai.com/cdn-cgi/l/email-protection#d4a7a1a4a4bba6a094a0b1a7a0b9a1fab5bd) team to get the **Group** feature enabled for your organization.

## Feature Of SCIM[â](https://www.testmuai.com/support/docs/scim#feature-of-scim "Direct link to Feature Of SCIM")

TestMu AI provides the support for the below SCIM features.

  * **User Provisioning and De-provisioning** : SCIM facilitates the automatic provisioning and de-provisioning of user accounts across different systems and services. When a user is added or removed from the identity provider, SCIM can be used to propagate these changes to your TestMu AI account.
  * **Updating User Attributes** : Using SCIM you can update user attribute such as **Organization Role** directly from your Identity Provider.

## Copy SCIM Base URL and Bearer Token (Auth Header Required by IdP)[â](https://www.testmuai.com/support/docs/scim#copy-scim-base-url-and-bearer-token-auth-header-required-by-idp "Direct link to Copy SCIM Base URL and Bearer Token \(Auth Header Required by IdP\)")

**Step 1:** Sign in to your TestMu AI account. Don't have an account, [register for free](https://accounts.lambdatest.com/register).

![Image](https://www.testmuai.com/support/assets/images/dashboard-4178ade88e581c9f63f4081b09e92434.webp)   

**Step 2:** Head to **Settings** and select **Organization Settings** from the dropdown.

![Image](https://www.testmuai.com/support/assets/images/org-settings-6bada635dfff28c74a6effdb4c963c7b.webp)   

**Step 3:** Head to the **Security** tab and click and copy the **SCIM Base URL and Bearer Token** option.

![Image](https://www.testmuai.com/support/assets/images/scim-base-url-738ebf247377de07ca78c8cef644e3bc.png)   

## SCIM User Attributes[â](https://www.testmuai.com/support/docs/scim#scim-user-attributes "Direct link to SCIM User Attributes")
    
    
    {  
        "schemas": [  
            "urn:ietf:params:scim:schemas:core:2.0:User",  
            "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User"  
        ],  
        "userName": "[[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection)",  
        "active": true,  
        "name": {  
            "formatted": "givenName familyName",  
            "familyName": "familyName",  
            "givenName": "givenName"  
        },  
      "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User": {  
        "OrganizationRole" : "User"  
      }  
    }  
    

**schemas(required)** : An array of schema URNs (Uniform Resource Names) that define the structure and attributes of the user object. In this case, the JSON conforms to the SCIM (System for Cross-domain Identity Management) schema for users, including an extension schema for enterprise-specific attributes.

**id** Unique Identifier assigned to provisioned users by TestMu AI

**userName(required)** : The username associated with the user **(Must be Email)**

**active(required)** : A boolean indicating whether the user's account is active or not.

**name(required)** An object containing the user's name information. The formatted property provides the full name, while familyName and givenName represent the family and given names respectively.

**urn:ietf:params:scim:schemas:extension: TestMu AI:2.0:User**:This extension schema is used to add custom attributes or properties to the user object that are not part of the standard SCIM (System for Cross-domain Identity Management) core schema. Here you can set **OrganizationRole** which can have either of (Admin/User/Guest) values. If this attribute is not passed OrganizationRole is set to **User** by default

## Creating Users[â](https://www.testmuai.com/support/docs/scim#creating-users "Direct link to Creating Users")

If the user you want to add does not have a TestMu AI account, user will be created. If the user has an existing account with TestMu AI and is part of another organization then the user won't be auto provisioned, and you will need to add the user to your organization via team invite

## Updating User Attributes[â](https://www.testmuai.com/support/docs/scim#updating-user-attributes "Direct link to Updating User Attributes")

Only Organization Role can be updated for users, userName(email) can't be updated once user is created and Name can only be updated from TestMu AI Account Settings page

## Deleting or Deactivating users[â](https://www.testmuai.com/support/docs/scim#deleting-or-deactivating-users "Direct link to Deleting or Deactivating users")

User accounts can only be deactivated (active:false) via PUT/PATCH or DELETE User requests, For permanently deleting account users need to request account deletion from TestMu AI Account Settings page

## User Operations[â](https://www.testmuai.com/support/docs/scim#user-operations "Direct link to User Operations")

## Create User[â](https://www.testmuai.com/support/docs/scim#create-user "Direct link to Create User")

### Request[â](https://www.testmuai.com/support/docs/scim#request "Direct link to Request")

POST `https://auth.lambdatest.com/api/scim/Users`
    
    
    {  
      "schemas": [  
        "urn:ietf:params:scim:schemas:core:2.0:User",  
        "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User"  
      ],  
      "userName": "[[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection)",  
      "active": true,  
      "name": {  
        "formatted": "givenName familyName",  
        "familyName": "familyName",  
        "givenName": "givenName"  
      },  
      "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User": {  
        "OrganizationRole" : "User"  
      }  
    }  
    

### Response[â](https://www.testmuai.com/support/docs/scim#response "Direct link to Response")

HTTP/1.1 201 Created
    
    
    {  
      "schemas": [  
        "urn:ietf:params:scim:schemas:core:2.0:User",  
        "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User"  
      ],  
      "id": "23123",  
      "userName": "[[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection)",  
      "active": true,  
      "name": {  
        "formatted": "givenName familyName",  
        "familyName": "familyName",  
        "givenName": "givenName"  
      },  
      "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User": {  
        "OrganizationRole" : "User"  
      }  
    }  
    

## GET Users[â](https://www.testmuai.com/support/docs/scim#get-users "Direct link to GET Users")

### Request[â](https://www.testmuai.com/support/docs/scim#request-1 "Direct link to Request")

GET `https://auth.lambdatest.com/api/scim/USERS`

### Response[â](https://www.testmuai.com/support/docs/scim#response-1 "Direct link to Response")

HTTP/1.1 200 OK
    
    
    {  
        "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],  
        "totalResults": 1,  
        "Resources": [{  
          "schemas": [  
            "urn:ietf:params:scim:schemas:core:2.0:User",  
            "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User"  
          ],  
          "id": "23123",  
          "userName": "[[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection)",  
          "active": true,  
          "name": {  
            "formatted": "givenName familyName",  
            "familyName": "familyName",  
            "givenName": "givenName"  
          },  
          "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User": {  
            "OrganizationRole" : "User"  
          }  
        }],  
        "startIndex": 1,  
        "itemsPerPage": 20  
    }  
    

### Response - Zero Results[â](https://www.testmuai.com/support/docs/scim#response---zero-results "Direct link to Response - Zero Results")

HTTP/1.1 200 OK
    
    
    {  
        "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],  
        "totalResults": 0,  
        "Resources": [],  
        "startIndex": 1,  
        "itemsPerPage": 20  
    }  
    

## GET Users by query[â](https://www.testmuai.com/support/docs/scim#get-users-by-query "Direct link to GET Users by query")

### Request[â](https://www.testmuai.com/support/docs/scim#request-2 "Direct link to Request")

You can only filter users using email in the following format

GET `https://auth.lambdatest.com/api/scim/Users?filter=userName` eq "[[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#0773627473627547736274732964686a)"

### Response[â](https://www.testmuai.com/support/docs/scim#response-2 "Direct link to Response")
    
    
    {  
        "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],  
        "totalResults": 1,  
        "Resources": [{  
          "schemas": [  
            "urn:ietf:params:scim:schemas:core:2.0:User",  
            "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User"  
          ],  
          "id": "23123",  
          "userName": "[[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection)",  
          "active": true,  
          "name": {  
            "formatted": "givenName familyName",  
            "familyName": "familyName",  
            "givenName": "givenName"  
          },  
          "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User": {  
            "OrganizationRole" : "User"  
          }  
        }],  
        "startIndex": 1,  
        "itemsPerPage": 20  
    }  
    

### Response Zero results[â](https://www.testmuai.com/support/docs/scim#response-zero-results "Direct link to Response Zero results")

HTTP/1.1 200 OK
    
    
    {  
        "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],  
        "totalResults": 0,  
        "Resources": [],  
        "startIndex": 1,  
        "itemsPerPage": 20  
    }  
    

### Response User is part of a different org[â](https://www.testmuai.com/support/docs/scim#response-user-is-part-of-a-different-org "Direct link to Response User is part of a different org")

HTTP/1.1 400 Bad Request

## GET User by id[â](https://www.testmuai.com/support/docs/scim#get-user-by-id "Direct link to GET User by id")

### Request[â](https://www.testmuai.com/support/docs/scim#request-3 "Direct link to Request")

GET `https://auth.lambdatest.com/api/scim/Users/id`

### Response[â](https://www.testmuai.com/support/docs/scim#response-3 "Direct link to Response")

HTTP/1.1 200 OK
    
    
    {  
      "schemas": [  
        "urn:ietf:params:scim:schemas:core:2.0:User",  
        "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User"  
      ],  
      "id": "23123",  
      "userName": "[[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection)",  
      "active": true,  
      "name": {  
        "formatted": "givenName familyName",  
        "familyName": "familyName",  
        "givenName": "givenName"  
      },  
      "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User": {  
        "OrganizationRole" : "User"  
      }  
    }  
    

### Response User not found[â](https://www.testmuai.com/support/docs/scim#response-user-not-found "Direct link to Response User not found")

HTTP/1.1 404 Not Found

### Response User is part of a different org[â](https://www.testmuai.com/support/docs/scim#response-user-is-part-of-a-different-org-1 "Direct link to Response User is part of a different org")

HTTP/1.1 400 Bad Request

## Update a specific User (PUT)[â](https://www.testmuai.com/support/docs/scim#update-a-specific-user-put "Direct link to Update a specific User \(PUT\)")

Only OrganizationRole or Active Fields can be updated

### Request[â](https://www.testmuai.com/support/docs/scim#request-4 "Direct link to Request")

PUT `https://auth.lambdatest.com/api/scim/Users/id` HTTP/1.1
    
    
    {  
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],  
      "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User": {  
        "OrganizationRole" : "User"  
      },  
      "active": true  
    }  
    

### Response[â](https://www.testmuai.com/support/docs/scim#response-4 "Direct link to Response")

HTTP/1.1 200 OK
    
    
    {  
      "schemas": [  
        "urn:ietf:params:scim:schemas:core:2.0:User",  
        "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User"  
      ],  
      "id": "23123",  
      "userName": "[[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection)",  
      "active": true,  
      "name": {  
        "formatted": "givenName familyName",  
        "familyName": "familyName",  
        "givenName": "givenName"  
      },  
      "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User": {  
        "OrganizationRole" : "User"  
      }  
    }  
    

### Response User not found[â](https://www.testmuai.com/support/docs/scim#response-user-not-found-1 "Direct link to Response User not found")

HTTP/1.1 404 Not Found

### Response User is part of a different org[â](https://www.testmuai.com/support/docs/scim#response-user-is-part-of-a-different-org-2 "Direct link to Response User is part of a different org")

HTTP/1.1 400 Bad Request

## Update a specific User (PATCH)[â](https://www.testmuai.com/support/docs/scim#update-a-specific-user-patch "Direct link to Update a specific User \(PATCH\)")

Only OrganizationRole or Active Fields can be updated

### Request[â](https://www.testmuai.com/support/docs/scim#request-5 "Direct link to Request")

PATCH `https://auth.lambdatest.com/api/scim/Users/id` HTTP/1.1
    
    
    {  
      "schemas": [  
        "urn:ietf:params:scim:api:messages:2.0:PatchOp"  
      ],  
      "Operations": [  
        {  
          "op": "Replace",  
          "path": "active",  
          "value": false  
        },  
        {  
          "op": "Replace",  
          "path": "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User:OrganizationRole",  
          "value": "User"  
        }  
      ]  
    }  
    

### Response[â](https://www.testmuai.com/support/docs/scim#response-5 "Direct link to Response")

HTTP/1.1 200 OK
    
    
    {  
      "schemas": [  
        "urn:ietf:params:scim:schemas:core:2.0:User",  
        "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User"  
      ],  
      "id": "23123",  
      "userName": "[[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection)",  
      "active": false,  
      "name": {  
        "formatted": "givenName familyName",  
        "familyName": "familyName",  
        "givenName": "givenName"  
      },  
      "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User": {  
        "OrganizationRole" : "User"  
      }  
    }  
    

### Response User not found[â](https://www.testmuai.com/support/docs/scim#response-user-not-found-2 "Direct link to Response User not found")

HTTP/1.1 404 Not Found

### Response User is part of a different org[â](https://www.testmuai.com/support/docs/scim#response-user-is-part-of-a-different-org-3 "Direct link to Response User is part of a different org")

HTTP/1.1 400 Bad Request

## Disable a specific User (PATCH)[â](https://www.testmuai.com/support/docs/scim#disable-a-specific-user-patch "Direct link to Disable a specific User \(PATCH\)")

Only OrganizationRole or Active Fields can be updated

### Request[â](https://www.testmuai.com/support/docs/scim#request-6 "Direct link to Request")

PATCH `https://auth.lambdatest.com/api/scim/Users/id` HTTP/1.1
    
    
    {  
      "schemas": [  
        "urn:ietf:params:scim:api:messages:2.0:PatchOp"  
      ],  
      "Operations": [  
        {  
          "op": "Replace",  
          "path": "active",  
          "value": false  
        }  
      ]  
    }  
    

### Response[â](https://www.testmuai.com/support/docs/scim#response-6 "Direct link to Response")

HTTP/1.1 200 OK
    
    
    {  
      "schemas": [  
        "urn:ietf:params:scim:schemas:core:2.0:User",  
        "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User"  
      ],  
      "id": "23123",  
      "userName": "[[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection)",  
      "active": false,  
      "name": {  
        "formatted": "givenName familyName",  
        "familyName": "familyName",  
        "givenName": "givenName"  
      },  
      "urn:ietf:params:scim:schemas:extension:LambdaTest:2.0:User": {  
        "OrganizationRole" : "User"  
      }  
    }  
    

### Response User not found[â](https://www.testmuai.com/support/docs/scim#response-user-not-found-3 "Direct link to Response User not found")

HTTP/1.1 404 Not Found

### Response User is part of a different org[â](https://www.testmuai.com/support/docs/scim#response-user-is-part-of-a-different-org-4 "Direct link to Response User is part of a different org")

HTTP/1.1 400 Bad Request

## Delete User[â](https://www.testmuai.com/support/docs/scim#delete-user "Direct link to Delete User")

Note: Delete User Request only sets user account to inactive

### Request[â](https://www.testmuai.com/support/docs/scim#request-7 "Direct link to Request")

DELETE `https://auth.lambdatest.com/api/scim/Users/id` HTTP/1.1

### Response[â](https://www.testmuai.com/support/docs/scim#response-7 "Direct link to Response")

HTTP/1.1 204 No Content

### Response User not found[â](https://www.testmuai.com/support/docs/scim#response-user-not-found-4 "Direct link to Response User not found")

HTTP/1.1 404 Not Found

### Response User is part of a different org[â](https://www.testmuai.com/support/docs/scim#response-user-is-part-of-a-different-org-5 "Direct link to Response User is part of a different org")

HTTP/1.1 400 Bad Request

## See Limitations[â](https://www.testmuai.com/support/docs/scim#see-limitations "Direct link to See Limitations")

The following is the list of TestMu AI SCIM limitations

  * Users existing in another organizations won't be auto provisioned
  * Delete User Request only sets user account to inactive

> That's all you need to know about Single sign-on(SSO) authentication feature.In case you have any questions please feel free to reach out to us via the **24/7 chat support** or email us over [[email protected]](https://www.testmuai.com/cdn-cgi/l/email-protection#5f2c2a2f2f302d2b1f2b3a2c2b322a713e36).

---

*Auto-generated from TestMu AI documentation.*