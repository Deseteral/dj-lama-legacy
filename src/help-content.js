export var content =
`Bot reaguje na komendy tylko na kanale #{{CHANNEL_NAME}}.
Parametry podane w \`<>\` są obowiązkowe, \`*takie*\` są opcjonalne.
Czas podawać w formacie mm:ss, np. 1:30, 12:00 itd.
Dostępne są podane komendy:\n
    \`yt <id> *start* *end*\` - dodaje utwór z podanym \`id\` do kolejki odtwarzania, rozpoczynając odtwarzanie od czasu \`start\` do \`end\`.
    \`song\` - wysyła link do aktualnie odtwarzanego utworu.
    \`skip\` - pomija aktualnie odtwarzany utwór.
    \`add <id> | <artist> | <title> | *start* | *end*\` - dodaje utwór o podanym id do bazy daych jako tytuł \`title\`, wykonawcę \`artist\` oraz z opcjonalnymi czasami. Ważne, poszczególne pola oddzielone są znakiem \`|\`.
    \`play *[--after/-a]* <title>\` - odtwarza utwór o danym tytule z bazy danych. Jeżeli dodana zostanie flaga \`after\` przebój zostanie dodany po aktualnie odtwarzanym utworze.
    \`play-new *number*\` - dodaje do kolejki \`number\` (lub 1 jeżeli nie podano) nigdy nie odtwarzanych utworów.
    \`say <sentence>\` - prośba do spikera radiowego o pozdrowienia :wink:.
    \`list\` - wyświetla listę wszystkich utworów w bazie danych (sortowanych po wykonawcy).
    \`random *number*\` - dodaje do kolejki losowy utwór z bazy danych, lub \`number\` losowych utworów.
    \`link\` - wyświetla adres strony serwera.`;
