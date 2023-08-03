Feature: Web Interactions with Inventory

    @invt
    Scenario Outline: Demo Web Interactions with Inventory of products
        Given Login to inventory web app
        Then Inventory page should list <NumberOfProducts>
        Then Validate all products have valid price

        Examples:
            | TestID     | NumberOfProducts |
            | INVT_TC001 | 6                |
