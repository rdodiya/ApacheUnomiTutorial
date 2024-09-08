curl --location --request POST 'http://localhost:8181/cxs/scopes' \
  --header 'Authorization: Basic a2FyYWY6a2FyYWY=' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "itemId": "example-tracker",
    "metadata": {
      "id": "example-tracker",
      "name": "Unomi tracker Example Scope"
    }
  }'