export var content =
`Bot reaguje na komendy tylko na kanale #CHANNEL_NAME.
Parametry podane w \`<>\` są obowiązkowe, \`*takie*\` są opcjonalne.
Czas podawać w formacie mm:ss, np. 1:30, 12:00 itd.
Dostępne są podane komendy:\n
    \`yt <id> *start* *end*\` - dodaje utwór z podanym \`id\` do kolejki odtwarzania, rozpoczynając odtwarzanie od czasu \`start\` do \`end\`.
    \`song\` - wysyła link do aktualnie odtwarzanego utworu.
    \`skip\` - pomija aktualnie odtwarzany utwór.
    \`add <id> | <artist> | <title> | *start* | *end*\` - dodaje utwór o podanym id do bazy daych jako tytuł \`title\`, wykonawcę \`artist\` oraz z opcjonalnymi czasami. Ważne, poszczególne pola oddzielone są znakiem \`|\`.
    \`play <title>\` - odtwarza utwór o danym tytule z bazy danych.
    \`say <sentence>\` - prośba do spikera radiowego o pozdrowienia :wink:.
    \`list\` - wyświetla listę wszystkich utworów w bazie danych (sortowanych po wykonawcy).
    \`random\` - dodaje do kolejki losowy utwór z bazy danych.`;
