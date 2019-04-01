# Contribute to <Project Name>

Want to help us out with <Project Name>? Awesome! This page contains information 
about reporting issues as well as some tips and guidelines useful to experienced 
open source contributors.

## Topics

* [Quick Contribution Tips and Guidelines](#quick-contribution-tips-and-guidelines)
* [Future Topics]()

## Quick contribution tips and guidelines

This section gives the experienced contributor some tips and guidelines.

### Pull requests are always welcome

Not sure if that typo is worth a pull request? Found a bug and know how to fix
it? Do it! We will appreciate it. Any significant improvement should be
documented as [a GitHub issue](https://github.com/moby/moby/issues) before
anybody starts working on it.

We are always thrilled to receive pull requests. We do our best to process them
quickly. If your pull request is not accepted on the first try,
don't get discouraged! Our contributor's guide explains [the review process we
use for simple changes](https://docs.docker.com/opensource/workflow/make-a-contribution/).

### Conventions

This project uses a standard Git workflow.

Fork the repository and make changes on your fork in a feature branch:

- If it's a bug fix branch, name it XXXX-something where XXXX is the number of
	the issue. 
- If it's a feature branch, create an enhancement issue to announce
	your intentions, and name it XXXX-something where XXXX is the number of the
	issue.
	
Pull request descriptions should be as clear as possible and include a reference
to all the issues that they address.

### Successful Changes

Before contributing large or high impact changes, make the effort to coordinate
with the maintainers of the project before submitting a pull request. This
prevents you from doing extra work that may or may not be merged.

Large PRs that are just submitted without any prior communication are unlikely
to be successful.

### Commit Messages

Commit messages must start with a capitalized and short summary (max. 50 chars), 
followed by an optional, more detailed explanatory text which is separated from 
the summary by an empty line.