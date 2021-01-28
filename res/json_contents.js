const JSON_CONTENTS = {
    "verbs": {
        "base": {
            "extends": "",
            "vars": {
                "stem": ""
            },
            "regular": {
                "nonPast": [
                    "word",
                    ""
                ],
                "nonPastPolite": [
                    "stem+ます",
                    "stem+ません"
                ],
                "past": [
                    "",
                    "nonPastNEGい:かった"
                ],
                "pastPolite": [
                    "stem+ました",
                    "stem+ませんでした"
                ],
                "teForm": [
                    "pastあ>え",
                    "nonPastNEGい:くて"
                ],
                "potential": [
                    "",
                    ""
                ],
                "passive": [
                    "wordう>あ+れる",
                    "wordう>あ+れない"
                ],
                "causative": [
                    "",
                    ""
                ],
                "causativePassive": [
                    "causativeる:られる",
                    "causativeる:られない"
                ],
                "imperativePolite": [
                    "stem+なさい",
                    ""
                ],
                "imperative": [
                    "",
                    "word+な"
                ],
                "volitionalPolite": [
                    "",
                    "nonPastPolite+まい"
                ],
                "volitional": [
                    "",
                    ""
                ],
                "taiFormNonPast": [
                    "",
                    ""
                ],
                "taiFormPast": [
                    "",
                    ""
                ],
                "withoutFormPolite": "nonPastNEGない:ず",
                "withoutForm": "nonPastNEG+で"
            },
            "exceptions": {}
        },
        "う": {
            "extends": "base",
            "vars": {
                "stem": "wordう>い"
            },
            "regular": {
                "nonPast": [
                    "word",
                    "wordう>あ+ない"
                ],
                "potential": [
                    "wordう>え+る",
                    "wordう>え+ない"
                ],
                "causative": [
                    "wordう>あ+せる",
                    "wordう>あ+せない"
                ],
                "imperative": [
                    "wordう>え",
                    ""
                ],
                "volitional": [
                    "wordう>お+う",
                    "word+まい"
                ],
                "volitionalPolite": [
                    "stem+ましょう",
                    ""
                ]
            },
            "exceptions": {
                "す": {
                    "past": [
                        "wordす:した",
                        ""
                    ]
                },
                "く": {
                    "past": [
                        "wordく:いた",
                        ""
                    ]
                },
                "ぐ": {
                    "past": [
                        "wordぐ:いだ",
                        ""
                    ]
                },
                "むぶぬ": {
                    "past": [
                        "word-1+んだ",
                        ""
                    ]
                },
                "う": {
                    "nonPast": [
                        "",
                        "wordう:わない"
                    ],
                    "past": [
                        "wordう:った",
                        ""
                    ]
                },
                "つる": {
                    "past": [
                        "word-1+った",
                        ""
                    ]
                },
                "いく": {
                    "past": [
                        "wordく:った",
                        ""
                    ]
                },
                "ある": {
                    "nonPast": [
                        "",
                        "+ない"
                    ],
                    "potential": [
                        "あり得る",
                        ""
                    ]
                }
            }
        }
    }
}