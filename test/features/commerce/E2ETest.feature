Feature: Customer search

    @api @smoke @debug
    Scenario Outline: <TestID>: Search external customers
        Given Get list of users from reqres.in
        When An as Admin user login to nopcommerce site
        When Search users in customers list
        Then Verify if all users exist in customers list
        # Then Validate DB result

        Examples:
            | TestID    |
            | E2E_TC001 |

