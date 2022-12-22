# 2. Using Feature Sliced Design (FSD) to Create Application Structure

Date: 2022-12-22

## Status

Accepted

## Context

The application is planned to be small-medium in size and should be easily extensible as it acts as a template / example of how the `flexlayout-react` and `ag-grid` packages can be used in tandem. A decision needs to be made about how the project will be structured to support these requirements.

## Decision

A decision has been made to use [Feature Sliced Design](https://feature-sliced.design/) (FSD) to organise the project. This structure provides a clean separation of concerns, by organising the code by widgets, entities and features, further sliced by business domain. This design also lends itself very well to the suspected extensions of this project, within sectors such as financial services, where it is natural to slice projects by domain.

## Consequences

Since the code is separated into atomic parts sliced by domain, maintenance and feature additions become easier to accomplish since the code worked on is less noisy.