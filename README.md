Welcome to the repository. Have a good day.

# Setup
To setup the app, run `npm install`, set the variables inside `.env` and run `npm start`.

## Variables inside `.env`

1. `APP_PORT` - the port at which the app will listen.
1. `MONGODB_URI` - URI of MongoDB database.

# API directories
| Request type | Route | Request body | Response | Description |
| :---: | :---: | :---: | :---: | :---: |
| `POST` | `/register` | `email`, `password`, `password_confirmation` | `token` | Allows the user to create an account, returns the API token. |
| `POST` | `/login` | `email`, `password` | `token` | Allows the user to login to an existing account, returns the API token. |
| `POST` | `/logout` | `token` | `msg` | Allows the user to logout from the API. Returns confirmation message. The given token gets revoked. |
| `POST` | `/update` | `token`, `email` (optional), `password` (optional), `password_confirmation` (required if `password` is present), `previous_password` (required if `password` is present) | `msg` | Allows the user to update their profile information. Returns confirmation message. The given token stays the same. |
| `POST` | `/delete` | `token` | `msg` | Allows the user to delete their account. All of the user's notes get deleted as well. Returns a confirmation message. |
| `GET` | `/notes` | `token` | Array of notes | Allows the user to retrieve all their notes. |
| `POST` | `/notes/create` | `token`, `title`, `content` | Created note | Allows the user to create a note. The `title` and `content` elements can be empty. | 
| `GET` | `/notes/<ID>` | `token` | Note | Allows the user to retrieve a specific note. |
| `PATCH` | `/notes/<ID>` | `token`, `title`, `content` | Updated note | Allows the user to update note. |
| `DELETE` | `/notes/<ID>` | `token` | `msg` | Allows the user to delete a note. Returns confirmation message. |

# HATEOAS support
Including the `hateoas` attribute set to a truthy value in the body will add the `hateoas` property to the response object, which looks like this:

```json
{
	"hateoas": {
		"update": {
			"directory": "/notes/6036b9ede95e0d3bd411119f",
			"method": "PATCH"
		},
		"read": {
			"directory": "/notes/6036b9ede95e0d3bd411119f",
			"method": "GET"
		},
		"delete": {
			"directory": "/notes/6036b9ede95e0d3bd411119f",
			"method": "DELETE"
		}
	}
}
```

Not including this property or setting it to false means that this property will be undefined.