
Feature: Web Interactions with Inventory

    @invt @regression
    Scenario Outline: <TestID> Demo Web Interactions with Inventory of products
        # Given Login to inventory web app
        Given As a standard user I Login to inventory web app
            | UserType | Username                |
            | StdUser  | standard_user           |
            | ProbUser | problem_user            |
            | PerfUser | performance_glitch_user |
        Then Inventory page should list <NumberOfProducts>
        Then Validate all products have valid price

        Examples:
            | TestID     | NumberOfProducts |
            | INVT_TC001 | 6                |

    Scenario Outline: <TestID> Neg Demo Web Interactions with Inventory of products
        Given As a standard user I Login to inventory web app
            | UserType | Username                |
            | StdUser  | standard_user           |
            | ProbUser | problem_user            |
            | PerfUser | performance_glitch_user |
        Given As a standard user I Login to inventory web app
        Then Inventory page should not list <NumberOfProducts>
        Then Validate all products have valid price

        Examples:
            | TestID     | NumberOfProducts |
            | INVT_TC002 | 6                |
