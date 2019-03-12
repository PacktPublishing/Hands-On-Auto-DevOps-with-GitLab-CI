# Hands-On Auto DevOps with GitLab CI

This is the code repository for Hands-On Auto DevOps with GitLab CI [Video],
published by Packt. It contains all the supporting project files necessary to
work through the video course from start to finish.

## About the Video Course

Developing modern software requires an automated pipeline that builds, tests,
and deploys your application, complete with its required infrastructure.

GitLab is a Git-based version control server, available at gitlab.com or as a
private server. GitLab CI is automated build and deployment built right into
GitLab. With GitLab CI, it is easy to add build and deployment automation that
triggers on every code change, helping you build high-quality, reliable software
and deploy it to production at speed.

This course will give you a hands-on tutorial with GitLab CI. You will use
GitLab CI to create a DevOps Pipeline to automatically build, test, and deploy
software to virtual machines and container environments. You will explore the
features of GitLab CI, including using runners to execute build jobs, creating
multi-stage builds, and deploying to virtualized and containerized environments.

You will see how easy it is to get started with GitLab CI by deploying your own
runners in cloud environments or on your own servers, using Docker and
Kubernetes or ordinary scripting.

By the end of this course, you’ll be ready to use GitLab CI for your own
application, automating your build and deployment pipeline.

## What You Will Learn

* Automate your application build, test, and deployment through simple
  configuration of GitLab CI.
* Build confidence in your software by integrating test and quality checking
  into your development process.
* Deploy your application automatically to virtualized and containerized cloud
  environments so your software is always up to date.
* Integrate monitoring so you can be sure your application is working well in
  production.
* Create your own automated build infrastructure fully under your control.

## Instructions and Navigation

### Assumed Knowledge

To fully benefit from the coverage included in this course, you will need:

* An understanding of building and deploying software
* Basic knowledge of Git and version control tools.

You don’t need any prior experience building with GitLab CI.

### Technical Requirements

This course has the following software requirements:

* An editor (Atom suggested)
  * Recommended packages: atom-ide-ui, ide-yaml
* Git (either Git for Windows or a Git command-line client)

To run GitLab and GitLab Runner:
* Access to at least one physical or virtual machine running Linux

You can get started with automated builds with GitLab CI with no more than a web
browser! However, to get the most out of this course, we recommend enough
hardware to run a private GitLab server. This course has been tested on the
following system configuration:

* OS: Ubuntu 18.04
* Processor: Quad Core Intel
* Memory: 8GB
* Hard Disk Space: 100GB

This course demonstrates using the resources available on gitlab.com, for which
only access to the Internet is needed. This course also demonstrates building
private GitLab infrastructure. The examples use Amazon Web Services to create
the needed computing resources, but other cloud providers or local hardware will
work as well.

## Code Repository Layout

This repository contains multiple subdirectories. Each is designed to be used
as a separate project and Git repository in gitlab.com or a private GitLab
server. This is necessary because each directory contains a different
`.gitlab-ci.yml` file used by GitLab CI for building.

The directories are:

* `auto-devops`: Used with GitLab CI Auto DevOps feature, where the build
  configuration is automatically detected. Does not contain a `.gitlab-ci.yml`
  file. Uses the same Node.js application as `kube-deploy`.
* `basic-build`: Simplest possible `.gitlab-ci.yml` file.
* `custom-ci`: Ansible configuration for creating and configuring instances in
  AWS EC2 to run GitLab Runner and GitLab Community Edition (GitLab CE).
* `dependency-example`: Build that shows how artifacts are declared and used
  in subsequent jobs.
* `kube-deploy`: A complete example of testing, building, and deploying a
  Node.js application. This is the primary example used for the course.
* `node-build`: A simplified build using a Node.js Docker container.
* `variable-example`: Build that shows how project and group variables are used
  in GitLab CI.

In addition to these directories, the file `gitlab.yaml` in this directory
provides Kubernetes configuration to create a `ServiceAccount` and a
`ClusterRoleBinding`. This is needed when using a custom Kubernetes cluster
with GitLab (as opposed to using Google Container Engine).
