```mermaid
    sequenceDiagram
        participant browser
        participant server

        browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note

        activate server

        server-->>browser: HTTP 302 Redirect to /exampleapp/notes
        deactivate server



        browser->>server:  HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes

        activate server

        server-->>browser: HTML-code
        deactivate server


        browser->>server:  HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate server

        server-->>browser: main.css
        deactivate server


        browser->>server:  HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js

        activate server

        server-->>browser: main.js
        deactivate server

        browser->>server:  HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json

        activate server

        server-->>browser: [{content : "HTML is easy", date: "2019-05-23"},...]
        deactivate server
       
```