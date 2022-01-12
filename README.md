# Library API

As the name suggests, this API manages a Library, the actual books are stored in a MongoDB instance on MongoDB Atlas.

The API itself is built using ExpressJs since there was no specified framework to use and for the database access I've used the native mongodb driver. Each book look like the following json document

```json
{
      "id": 46,
      "title": "A Christmas Carol in Prose; Being a Ghost Story of Christmas",
      "authors": [
        {
          "name": "Dickens, Charles",
          "birth_year": 1812,
          "death_year": 1870
        }
      ],
      "translators": [],
      "subjects": [
        "Christmas stories",
        "Ghost stories",
        "London (England) -- Fiction",
        "Misers -- Fiction",
        "Poor families -- Fiction",
        "Scrooge, Ebenezer (Fictitious character) -- Fiction",
        "Sick children -- Fiction"
      ],
      "bookshelves": [
        "Children's Literature",
        "Christmas"
      ],
      "languages": [
        "en"
      ],
      "copyright": false,
      "media_type": "Text",
      "formats": {
        "application/epub+zip": "https://www.gutenberg.org/ebooks/46.epub.images",
        "application/rdf+xml": "https://www.gutenberg.org/ebooks/46.rdf",
        "application/x-mobipocket-ebook": "https://www.gutenberg.org/ebooks/46.kindle.images",
        "text/plain; charset=us-ascii": "https://www.gutenberg.org/files/46/46-0.txt",
        "text/plain": "https://www.gutenberg.org/ebooks/46.txt.utf-8",
        "image/jpeg": "https://www.gutenberg.org/cache/epub/46/pg46.cover.small.jpg",
        "text/html": "https://www.gutenberg.org/files/46/46-h/46-h.htm",
        "application/zip": "https://www.gutenberg.org/files/46/46-0.zip"
      },
      "download_count": 68486
    }
```

## API URLs

The current API handles only GET requests, the end points are the following
> http://localhost:3000/library/books

Retrieves all the books from the database. It can also perform pagination if the request contains the parameter *page*, limited amount of the books, with size *pageSize* which is a defined constant.

```json
[{"_id":"61dadb48f1a678f56bd94ea2","id":8,"title":"Abraham Lincoln's Second Inaugural Address","authors":[{"name":"Lincoln, Abraham","birth_year":1809,"death_year":1865}],"translators":[],"subjects":["Presidents -- United States -- Inaugural addresses","United States -- Politics and government -- 1861-1865"],"bookshelves":["US Civil War"],"languages":["en"],"copyright":false,"media_type":"Text","formats":{"application/epub+zip":"https://www.gutenberg.org/ebooks/8.epub.images","application/rdf+xml":"https://www.gutenberg.org/ebooks/8.rdf","text/plain":"https://www.gutenberg.org/ebooks/8.txt.utf-8","application/x-mobipocket-ebook":"https://www.gutenberg.org/ebooks/8.kindle.images","image/jpeg":"https://www.gutenberg.org/cache/epub/8/pg8.cover.small.jpg","text/html":"https://www.gutenberg.org/ebooks/8.html.images","text/html; charset=us-ascii":"https://www.gutenberg.org/files/8/8-h/8-h.htm","text/plain; charset=us-ascii":"https://www.gutenberg.org/files/8/8.zip"},"download_count":84},
{"_id":"61dadb48f1a678f56bd94ea0","id":6,"title":"Give Me Liberty or Give Me Death","authors":[{"name":"Henry, Patrick","birth_year":1736,"death_year":1799}],"translators":[],"subjects":["Speeches, addresses, etc., American","United States -- Politics and government -- 1775-1783 -- Sources","Virginia -- Politics and government -- 1775-1783 -- Sources"],"bookshelves":["American Revolutionary War"],"languages":["en"],"copyright":false,"media_type":"Text","formats":{"application/epub+zip":"https://www.gutenberg.org/ebooks/6.epub.images","application/rdf+xml":"https://www.gutenberg.org/ebooks/6.rdf","text/plain":"https://www.gutenberg.org/ebooks/6.txt.utf-8","application/x-mobipocket-ebook":"https://www.gutenberg.org/ebooks/6.kindle.images","text/plain; charset=us-ascii":"https://www.gutenberg.org/files/6/6.txt","text/html":"https://www.gutenberg.org/files/6/6-h.zip","image/jpeg":"https://www.gutenberg.org/cache/epub/6/pg6.cover.medium.jpg","application/zip":"https://www.gutenberg.org/files/6/6.zip"},"download_count":163}]
```

> http://localhost:3000/library/books/:title

Gets all the books that contains the path parameter *:title* in their title, i.e it's not an exact match, but rather matching in the sense of regular expressions.

> http://localhost:3000/library/books/Lincoln
```json
[{"_id":"61dadb48f1a678f56bd9520f","id":906,"title":"Abraham Lincoln","authors":[{"name":"Lowell, James Russell","birth_year":1819,"death_year":1891}],"translators":[],"subjects":["Lincoln, Abraham, 1809-1865","United States -- History -- Civil War, 1861-1865"],"bookshelves":[],"languages":["en"],"copyright":false,"media_type":"Text","formats":{"application/epub+zip":"https://www.gutenberg.org/ebooks/906.epub.images","application/rdf+xml":"https://www.gutenberg.org/ebooks/906.rdf","text/plain":"https://www.gutenberg.org/ebooks/906.txt.utf-8","application/x-mobipocket-ebook":"https://www.gutenberg.org/ebooks/906.kindle.images","text/html; charset=iso-8859-1":"https://www.gutenberg.org/files/906/906-h.zip","text/plain; charset=us-ascii":"https://www.gutenberg.org/files/906/906.txt","image/jpeg":"https://www.gutenberg.org/cache/epub/906/pg906.cover.small.jpg","text/html":"https://www.gutenberg.org/ebooks/906.html.images"},"download_count":25}]
```

> http://localhost:3000/library/authors

Sends back the names of the authors

Ex:
```json
["Abbott, Edwin Abbott","Adam, G. Mercer (Graeme Mercer)","Adams, John Quincy","Addams, Jane","Aesop","Aiken, Conrad","Alcott, Louisa May","Aldrich, Thomas Bailey"]
```
> http://localhost:3000/library/authors/:author

Returns all the books that were writen by *author*

Ex:
> http://localhost:3000/library/authors/Lincoln
```json
[{"_id":"61dadb48f1a678f56bd94ea2","id":8,"title":"Abraham Lincoln's Second Inaugural Address","authors":[{"name":"Lincoln, Abraham","birth_year":1809,"death_year":1865}],"translators":[],"subjects":["Presidents -- United States -- Inaugural addresses","United States -- Politics and government -- 1861-1865"],"bookshelves":["US Civil War"],"languages":["en"],"copyright":false,"media_type":"Text","formats":{"application/epub+zip":"https://www.gutenberg.org/ebooks/8.epub.images","application/rdf+xml":"https://www.gutenberg.org/ebooks/8.rdf","text/plain":"https://www.gutenberg.org/ebooks/8.txt.utf-8","application/x-mobipocket-ebook":"https://www.gutenberg.org/ebooks/8.kindle.images","image/jpeg":"https://www.gutenberg.org/cache/epub/8/pg8.cover.small.jpg","text/html":"https://www.gutenberg.org/ebooks/8.html.images","text/html; charset=us-ascii":"https://www.gutenberg.org/files/8/8-h/8-h.htm","text/plain; charset=us-ascii":"https://www.gutenberg.org/files/8/8.zip"},"download_count":84}]
```
Ex:
> http://localhost:3000/library/subjects
```json
["Presidents -- United States -- Inaugural addresses","United States -- Politics and government -- 1861-1865","Speeches, addresses"]
```
Fetches the subjects of the books

Ex:
> http://localhost:3000/library/subjects/:subject

Returns all the books that belong to that subject

Ex:
> http://localhost:3000/library/subjects/politics
```json
[{"_id":"61dadb48f1a678f56bd94ec9","title":"The 1992 CIA World Factbook","authors":[{"name":"United States. Central Intelligence Agency","birth_year":null,"death_year":null}],"subjects":["Geography -- Handbooks, manuals, etc.","Political science -- Handbooks, manuals, etc.","Political statistics -- Handbooks, manuals, etc.","World politics -- Handbooks, manuals, etc."],"formats":{"application/epub+zip":"https://www.gutenberg.org/ebooks/48.epub.images","application/rdf+xml":"https://www.gutenberg.org/ebooks/48.rdf","text/plain":"https://www.gutenberg.org/ebooks/48.txt.utf-8","application/x-mobipocket-ebook":"https://www.gutenberg.org/ebooks/48.kindle.images","text/html":"https://www.gutenberg.org/ebooks/48.html.images","image/jpeg":"https://www.gutenberg.org/cache/epub/48/pg48.cover.small.jpg","application/zip":"https://www.gutenberg.org/files/48/48.zip","text/plain; charset=us-ascii":"https://www.gutenberg.org/files/48/48.txt"}}]
```
## Future Improvements
- Book recommendation
- Search for a book in a specific language
- Search for book that were writen in some range of years
- Improve performance and reponse time (Indexing in mongodb)

### Note: the mongodb instance will be turned off soon, for security purposes
  