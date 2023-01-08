
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/api/v1/email-summarizer/summarize": {
        "post": {
          "operationId": "EmailSummaryController_summarize",
          "summary": "Analyze the sentiment of the email",
          "description": "Analyze the sentiment of the email",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmailDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Return the summary and sentiment to the client",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SummaryAndSentimentResponseDTO"
                  }
                }
              }
            }
          },
          "tags": [
            "email-summarizer"
          ]
        }
      }
    },
    "info": {
      "title": "Fugu - Email Summarizer Using sentiment analysis and OpenAI GPT-3",
      "description": "Fugu - Email Summarizer Using sentiment analysis and OpenAI GPT-3",
      "version": "v1",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "schemas": {
        "ResponseErrorDto": {
          "type": "object",
          "properties": {
            "code": {
              "type": "string",
              "description": "A code that provides further context with respect to the error.\n    <br/><br/>\n    Examples: NotFound, AlreadyExists\n    "
            },
            "message": {
              "type": "string",
              "description": "Human readable error description intended for the developer for debugging purposes"
            },
            "path": {
              "type": "string",
              "description": "The request path associated with the response"
            },
            "statusCode": {
              "type": "number",
              "description": "HTTP status code associated with the response"
            },
            "timestamp": {
              "type": "string",
              "description": "A timestamp that represents when the error response was returned"
            },
            "type": {
              "type": "string",
              "description": "The top-level error type that corresponds to the type of exception that originated the error\n    <br/><br/>\n    Examples: NotFoundException\n    "
            }
          },
          "required": [
            "code",
            "message",
            "path",
            "statusCode",
            "timestamp",
            "type"
          ]
        },
        "EmailDTO": {
          "type": "object",
          "properties": {
            "text": {
              "type": "string",
              "example": "\n    Hi Bob,\n    \n    I hope this email finds you well. I wanted to see if you would be available to meet with me next Wednesday at 2 PM to discuss the project we are working on.\n\n    Please let me know if this time works for you or if you have any availability conflicts.\n  \n    Best,\n  "
            },
            "awaitingResponse": {
              "type": "boolean"
            }
          },
          "required": [
            "text",
            "awaitingResponse"
          ]
        },
        "SummaryAndSentimentResponseDTO": {
          "type": "object",
          "properties": {
            "summary": {
              "type": "string"
            },
            "sentiment": {
              "type": "string"
            },
            "awaitingResponse": {
              "type": "boolean",
              "default": false
            }
          },
          "required": [
            "summary",
            "sentiment",
            "awaitingResponse"
          ]
        }
      }
    }
  },
  "customOptions": {},
  "swaggerUrl": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
