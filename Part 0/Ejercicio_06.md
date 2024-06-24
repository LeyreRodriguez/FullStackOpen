```mermaid
    sequenceDiagram
        participant browser
        participant server

 
        browser->>server:  HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

        activate server

        server-->>browser: {content: "HTML is easy", date: "2024-06-24T17:47:11.483Z"}
        deactivate server

       
```