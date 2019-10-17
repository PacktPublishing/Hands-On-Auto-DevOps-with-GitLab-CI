# DevOps Todo Example

This is a todo app to demonstrate a DevOps build, test, and deployment pipeline.

# Running

* Have a PostgreSQL database available with a login and password.
* Set the variable `DATABASE_URL` for your PostgreSQL configuration.
* Run `npm start` to set up the database and start the application.

For example, for a local PostgreSQL with a `todo` user / password:

```
export DATABASE_URL=postgres://todo:todo@localhost/todo
```

# GitLab CI Setup

To use this project within GitLab CI:

1. Create a new project in GitLab.
1. Add the following variables to GitLab under Settings / CI/CD
   * `DBUSER`
   * `DBPASS`
   You can choose any value for these (e.g. `todo` for both will work).
1. Copy the entire folder to another directory outside the tree of this Git repository. 
1. Follow the GitLab instructions for an existing code directory.

This will get the GitLab CI pipeline working through the `test` and `build` stage. To
get it working through the `deploy` stage, set up Kubernetes for your GitLab CI project
as shown in the video.

# Provenance

This app is based on three separate repositories:

* [todo-backend-client][client], a Todo web client, which is itself a slightly-modified
  version of the [TodoMVC Architecture Example for backbone.js][todomvc].
  Copyright (c) Addy Osmani, Sindre Sorhus, Pascal Hartig, Stephen Sawchuk, Pete Hodgson.
* [todo-backend-js-spec][spec], a set of Mocha and Chai tests for a Todo app backend.
* [todo-backend-express][back], a Todo backend implementation that uses Node, Express, and
  PostgreSQL. Copyright (c) Dan Tao.

[client]:https://github.com/TodoBackend/todo-backend-client
[todomvc]:https://github.com/tastejs/todomvc/tree/gh-pages/architecture-examples/backbone/js
[spec]:https://github.com/TodoBackend/todo-backend-js-spec
[back]:https://github.com/dtao/todo-backend-express

I (Alan Hohn) have modified these to integrate them into a single application
and have added Docker and Kubernetes deployment files.

The various applications (including my modifications and added content) are
licensed under the MIT license:

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
