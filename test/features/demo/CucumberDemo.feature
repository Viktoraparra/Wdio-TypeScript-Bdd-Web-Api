@smoke
Feature: Cucumber Demo
    I can have a spacre for description for this feature....
    I can have a spacre for description for this feature....
    I can have a spacre for description for this feature....
    I can have a spacre for description for this feature....
    - Questions/clarifications
    - Know issues
    - Todo

    # Given - Precondition
    # When - Event or action
    # Then - Results
    # And, But and * - can be used
    # Same step with different step keywords are considered as 'duplcate'
    # Scnerio used to describe a specific scenario
    # Background is used to perform certain steps repatedly for all scenarios
    # only only for background is allowed in a single feature file

    Scenario: Scenario name
        Given new story
        Then this
        And Start to type your And step here

    @Test-01
    Scenario: Scenario name
        Given new story
        Then this
        And Start to type your And step here

        Given Google page is opened
        When Search with <SearchItem>
        Then Click on the first search result
        And URL should match <ExpectedURL>

        Examples:
            | TestID     | SearchItem | ExpectedURL              |
            | DEMO_TC001 | WDIO       | https://webdriver.io/es/ |
