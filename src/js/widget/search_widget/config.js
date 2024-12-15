const config = {
    "title": "Search Widget",
    "description": "Widget Used to search & highlight text with next and prev buttons",
    "container":{
        "class": "search-container",
    },
    "input": {
        "type": "search",
        "placeholder": "Search...",
        "class": "search-input"
    },
    "buttons": {
        "next": {
            "text": "↓"
        },
        "prev": {
            "text": "↑"
        },
        "search": {
            "text": "Search",
            "class": "search-btn"
        }
    },
    "para": {
        "count": {
            "text": "0 matches"
        }
    }
}
export default config;