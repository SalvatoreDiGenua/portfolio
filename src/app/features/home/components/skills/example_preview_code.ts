export const EXAMPLE_JAVASCRIPT: string = `
const btn = document.querySelector("button"); 
btn.addEventListener("click", () => { 
   const divElement = document.createElement("div"); 
   divElement.innerText = "This is a html div element create on runtime"; 
   divElement.style.color = "#f00"; 
   const bodyElement = document.querySelector("body"); 
   bodyElement.appendChild(divElement); 
}); 
/* this is a small example in JavaScript that upon clicking a button creates a div containing red colored text  */ 
`;


export const EXAMPLE_HTML = /* html */`
<!DOCTYPE html>
<html>
<head>
   <title>HTML example</title>
</head>
<body>
   <h1>Title of document</h1>
   <h3>Subtitle of document</h3>
   <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Est libero necessitatibus laboriosam voluptas quae laborum nulla in, reprehenderit consequuntur aperiam veniam consectetur rerum ipsum ipsa voluptatem voluptate magnam, maxime ipsam.
      Illum rem possimus labore maiores dolore optio eos aliquam excepturi! Fugiat repudiandae est consequuntur soluta asperiores doloribus ea temporibus esse amet perspiciatis fuga ratione eum, consectetur doloremque dolores nulla labore.
   </p>
</body>
</html>
`;

export const EXAMPLE_CSS = /* css */`
html {
   font-size: 14px
}

h1 {
   color: #369;
   font-family: Arial, Helvetica, sans-serif;
   font-size: 250%;
}

h2,
h3 {
   color: #444;
   font-family: Arial, Helvetica, sans-serif;
   font-weight: lighter;
}

body {
   margin: 2em;
}

body,
input[type="text"],
button {
   color: #333;
   font-family: Cambria, Georgia, serif;
}

button {
   background-color: #eee;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   color: black;
   font-size: 1.2rem;
   padding: 1rem;
   margin-right: 1rem;
   margin-bottom: 1rem;
   margin-top: 1rem;
}

button:hover {
   background-color: black;
   color: white;
}

button:disabled {
   background-color: #eee;
   color: #aaa;
   cursor: auto;
}

* {
   font-family: Arial, Helvetica, sans-serif;
}
`;

export const EXAMPLE_SCSS = `
$primary-color: red;
$secondary-color: green;


@mixin borderStyle($color: blue, $width: 1px) {
  border: $width solid $color;
}

.example-class {
  @include borderStyle($color: $primary-color);
   &__child {
    color: $secondary-color;
    text-shadow: 1 1 #000;
    margin: 10px 5px 20px;
    &:hover {
     text-decoration: underline;
     cursor: pointer;
    }
   }
}
`;

export const EXAMPLE_ANGULAR = `
import { Component, OnDestroy } from '@angular/core';
import { DataService } from './data.service.ts';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
 selector: 'app-root',
 template: '
   @for(let object of data; track object.id) {
      {{object.name}}
   } @empty {
      Empty data!
   }
',
 styles: ' ',
 standalore: true
})
export class AppComponent implements OnInit, OnDestroy {
 public title = 'This is App Root !';
 public data: object[] = [];

 constructor(private dataService: DataService) {
   this.getData();
 }

 getData() {
  this.dataService.getData()
  .pipe(takeUntilDestroyed(), filter(Boolean))
  .subscribe(data => this.data = data);
 }

}
`;

export const EXAMPLE_TYPESCRIPT = `
class Job {
  private id: number;
  public title: string;

  constructor(title: string) {
    this.id = this.generateId();
    this.title = title;
  }

  private generateId() {
    return new Date().getTime();
  }

  getId(): number {
   return this.id;
  }

  updateTitle(newTitle: string) {
   this.title = newTitle;
  }
}

const firstJob = new Job('this is the first job');
console.log(firstJob.name); // Error: Property 'name' does not exist on type Job
`;

export const EXAMPLE_RXJS = `
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    from([
      { brand: 'iPhone', model: '14', price: '$1000' },
      { brand: 'Samsung', model: 'S23', price: '$850' }
    ])
      .pipe(pluck('brand'))
      .map(data => data.toUpperCase())
      .subscribe(data => console.log(data)); // IPHONE, SAMSUNG
  }
}

/* This is a very small example but there are many other properties of RxJs library! */
`;

export const EXAMPLE_NODEJS = `
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log('Server running at http://127.0.0.1:3000');
})
`;

export const EXAMPLE_SQL = /* sql */`
CREATE TABLE DataObject (
    id int,
    title varchar(255),
);

INSERT INTO DataObject (id, title)
VALUES (28, 'this is the first object');

INSERT INTO DataObject (id, title)
VALUES (29, 'this is thedwd second object');

-- ooops...
UPDATE DataObject
SET title = 'this is the second object'
WHERE id = 29;

SELECT * FROM DataObject;

`;

