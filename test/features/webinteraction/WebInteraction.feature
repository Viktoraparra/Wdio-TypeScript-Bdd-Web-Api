Feature: Web Interactions

    @web @regression
    Scenario Outline: Demo Web Interactions with Inputs
        Given A web page is opened in <text>
        When Perfom web interactions with inputs

        Examples:
            | TestID    | text   |
            | WEB_TC001 | Inputs |

    @web @regression
    Scenario Outline: Demo Web Interactions with Dropdowns
        Given A web page is opened in <text>
        When Perfom web interactions with Dropdown

        Examples:
            | TestID    | text     |
            | WEB_TC002 | Dropdown |

    @web @regression
    Scenario Outline: Demo Web Interactions with Checkboxes
        Given A web page is opened in <text>
        When Perfom web interactions with Checkboxes

        Examples:
            | TestID    | text       |
            | WEB_TC003 | Checkboxes |

    @web @regression
    Scenario Outline: Demo Web Interactions with Windows
        Given A web page is opened in <text>
        When Perfom web interactions with Multiple Windows

        Examples:
            | TestID    | text             |
            | WEB_TC004 | Multiple Windows |

    @web @regression
    Scenario Outline: Demo Web Interactions with Browser Alerts
        Given A web page is opened in <text>
        When Perfom web interactions with Browsers alerts

        Examples:
            | TestID    | text              |
            | WEB_TC005 | JavaScript Alerts |

    @web @regression
    Scenario Outline: Demo Web Interactions with FileUpload
        Given A web page is opened in <text>
        When Perfom web interactions with FileUpload

        Examples:
            | TestID    | text        |
            | WEB_TC006 | File Upload |

    @web @regression
    Scenario Outline: Demo Web Interactions with Frames
        Given A web page is opened in <text>
        When Perfom web interactions with Frames

        Examples:
            | TestID    | text   |
            | WEB_TC007 | Frames |

    @web @regression
    Scenario Outline: Demo Web Interactions with Keypress actions
        Given A web page is opened in <text>
        When Perfom web interactions with keypress actions

        Examples:
            | TestID    | text   |
            | WEB_TC008 | Frames |
