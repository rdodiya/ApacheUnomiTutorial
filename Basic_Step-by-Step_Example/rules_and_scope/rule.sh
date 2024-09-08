curl -X POST http://localhost:8181/cxs/rules \
--user karaf:karaf \
-H "Content-Type: application/json" \
--data-raw '{
    "metadata": {
        "id": "pageViewCountRule",
        "name": "Page View Count Rule",
        "description": "Increments a count of Pages on a profile to indicate that this page is visited when a click event occurs"
    },
    "condition": {
        "type": "eventTypeCondition",
        "parameterValues": {
            "eventTypeId": "click"
        }
    },
    "actions": [
        {
            "type": "incrementPropertyAction",
            "parameterValues": {
                "propertyName": "eventProperty::target.itemType"
            }
        }
    ]
}'