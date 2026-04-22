const perspectiveID = 'manifestations'
const personsPerspectiveID = 'persons'
const orgsPerspectiveID = 'organizations'
const originalsPerspectiveID = 'originals'
const workClustersPerspectiveID = 'workClusters'

export const manifestationProperties = `
    {
      graph <http://beltrans-manifestations> { ?id schema:name ?prefLabel__id . }
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    #
    # targetYearOfPublication
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id schema:datePublished ?targetYearOfPublication . }
    }
    #
    # sourceLang
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id schema:translationOfWork ?original . }
      graph <http://beltrans-originals> { ?original schema:inLanguage ?sourceLang__id . }
      graph <http://master-data> { ?sourceLang__id mads:authoritativeLabel ?sourceLang__prefLabel . }
      FILTER(LANG(?sourceLang__prefLabel) = 'en')
    }
    #
    # targetLang
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id btm:inLanguage ?targetLang__id . }
      graph <http://master-data> { ?targetLang__id skos:prefLabel ?targetLang__prefLabel . }
      FILTER(LANG(?targetLang__prefLabel) = 'en')
    }
    #
    # ISBN-13
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id bibo:isbn13 ?isbn13 . }
    }
    #
    # author
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id schema:author ?author__id . }
      graph <http://beltrans-contributors> { 
        ?author__id schema:name ?author__prefLabel ;
                    dcterms:identifier ?authorID .
      }
      BIND(CONCAT("/${personsPerspectiveID}/page/", REPLACE(STR(?authorID), "^.*\\\\/(.+)", "$1")) AS ?author__dataProviderUrl)
    }

    #
    # translator
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id schema:translator ?translator__id . }
      graph <http://beltrans-contributors> { 
        ?translator__id schema:name ?translator__prefLabel ;
                        dcterms:identifier ?translatorID .
      }
      BIND(CONCAT("/${personsPerspectiveID}/page/", REPLACE(STR(?translatorID), "^.*\\\\/(.+)", "$1")) AS ?translator__dataProviderUrl)
    }

    #
    # illustrator
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id marcrel:ill ?illustrator__id . }
      graph <http://beltrans-contributors> { 
        ?illustrator__id schema:name ?illustrator__prefLabel ;
                         dcterms:identifier ?illustratorID .
      }
      BIND(CONCAT("/${personsPerspectiveID}/page/", REPLACE(STR(?illustratorID), "^.*\\\\/(.+)", "$1")) AS ?illustrator__dataProviderUrl)
    }

    #
    # scenarist
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id marcrel:sce ?scenarist__id . }
      graph <http://beltrans-contributors> { 
        ?scenarist__id schema:name ?scenarist__prefLabel ;
                       dcterms:identifier ?scenaristID .
      }
      BIND(CONCAT("/${personsPerspectiveID}/page/", REPLACE(STR(?scenaristID), "^.*\\\\/(.+)", "$1")) AS ?scenarist__dataProviderUrl)
    }

    #
    # publishing director
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id marcrel:pbd ?editor__id . }
      graph <http://beltrans-contributors> { 
        ?editor__id schema:name ?editor__prefLabel ;
                                dcterms:identifier ?editorID .
      }
      BIND(CONCAT("/${personsPerspectiveID}/page/", REPLACE(STR(?editorID), "^.*\\\\/(.+)", "$1")) AS ?editor__dataProviderUrl)
    }

    #
    # target publisher
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id marcrel:pbl ?targetPublisher__id . }
      graph <http://beltrans-contributors> {
        ?targetPublisher__id schema:name ?targetPublisher__prefLabel ;
                             dcterms:identifier ?targetPublisherID .
      }
      BIND(CONCAT("/${orgsPerspectiveID}/page/", REPLACE(STR(?targetPublisherID), "^.*\\\\/(.+)", "$1")) AS ?targetPublisher__dataProviderUrl)
    }

    #
    # source title
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id schema:translationOfWork ?original__id . }
      graph <http://beltrans-originals> { 
        ?original__id schema:name ?original__prefLabel ;
                      dcterms:identifier ?sourceID .
      }
      BIND(CONCAT("/${originalsPerspectiveID}/page/", REPLACE(STR(?sourceID), "^.*\\\\/(.+)", "$1")) AS ?original__dataProviderUrl) 
    }
    #
    # source publisher
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id schema:translationOfWork ?originalID . }
      graph <http://beltrans-originals> { ?originalID marcrel:pbl ?sourcePublisher__id . }
      graph <http://beltrans-contributors> {
        ?sourcePublisher__id schema:name ?sourcePublisher__prefLabel ;
                             dcterms:identifier ?sourcePublisherID .
      }
      BIND(CONCAT("/${orgsPerspectiveID}/page/", REPLACE(STR(?sourcePublisherID), "^.*\\\\/(.+)", "$1")) AS ?sourcePublisher__dataProviderUrl)
    }

    #
    # genre
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id schema:about ?genre__id . }
      graph <http://master-data> { ?genre__id skos:prefLabel ?genre__prefLabel . }
      FILTER(LANG(?genre__prefLabel) = 'en')
    }

    #
    # female author
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id btm:hasFemaleAuthor ?femaleAuthor__id . }
      graph <http://master-data> { ?femaleAuthor__id skos:prefLabel ?femaleAuthor__prefLabel . }
      FILTER(LANG(?femaleAuthor__prefLabel) = 'en')
    }

    #
    # female translator
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id btm:hasFemaleTranslator ?femaleTranslator__id . }
      graph <http://master-data> { ?femaleTranslator__id skos:prefLabel ?femaleTranslator__prefLabel . }
      FILTER(LANG(?femaleTranslator__prefLabel) = 'en')
    }

    #
    # female illustrator
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id btm:hasFemaleIllustrator ?femaleIllustrator__id . }
      graph <http://master-data> { ?femaleIllustrator__id skos:prefLabel ?femaleIllustrator__prefLabel . }
      FILTER(LANG(?femaleIllustrator__prefLabel) = 'en')
    }

    #
    # female editor
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id btm:hasFemaleEditor ?femaleEditor__id . }
      graph <http://master-data> { ?femaleEditor__id skos:prefLabel ?femaleEditor__prefLabel . }
      FILTER(LANG(?femaleEditor__prefLabel) = 'en')
    }

    #
    # KBR identifier
    #
    UNION
    {
      graph <http://beltrans-manifestations> { 
        ?id bf:identifiedBy ?kbrIDEntity .

        ?kbrIDEntity a bf:Identifier ;
                     rdfs:label "KBR" ;
                     rdf:value ?kbrIdentifier__prefLabel .
      }

      BIND(CONCAT("https://uurl.kbr.be/bib/", ?kbrIdentifier__prefLabel) AS ?kbrIdentifier__dataProviderUrl)
    }

    #
    # BnF identifier
    #
    UNION
    {
      graph <http://beltrans-manifestations> { 
        ?id bf:identifiedBy ?bnfIDEntity .

        ?bnfIDEntity a bf:Identifier ;
                     rdfs:label "BnF" ;
                     rdf:value ?bnfIdentifier__prefLabel .
      }

      BIND(CONCAT("https://catalogue.bnf.fr/de/ark:/12148/", ?bnfIdentifier__prefLabel) AS ?bnfIdentifier__dataProviderUrl)
    }

    #
    # KB identifier
    #
    UNION
    {
      graph <http://beltrans-manifestations> { 
        ?id bf:identifiedBy ?kbIDEntity .

        ?kbIDEntity a bf:Identifier ;
                     rdfs:label "KB" ;
                     rdf:value ?kbIdentifier__prefLabel .
      }

      BIND(CONCAT("https://data.bibliotheken.nl/id/nbt/", ?kbIdentifier__prefLabel) AS ?kbIdentifier__dataProviderUrl)
    }

    #
    # Unesco identifier
    #
    UNION
    {
      graph <http://beltrans-manifestations> { 
        ?id bf:identifiedBy ?unescoIDEntity .

        ?unescoIDEntity a bf:Identifier ;
                     rdfs:label "Unesco" ;
                     rdf:value ?unescoIdentifier .
      }

    }
`

export const targetPublicationPlaces = `
  SELECT DISTINCT ?id ?lat ?long ?markerColor
  (1 as ?instanceCount) # for heatmap
  WHERE {
    <FILTER>
    graph  <http://beltrans-manifestations> {
      ?id a schema:CreativeWork .
    }

    graph <http://beltrans-geo> {
      ?id schema:locationCreated/schema:latitude ?lat ;
          schema:locationCreated/schema:longitude ?long .
    }

    BIND("red" as ?markerColor)
  }

`

export const sourceTargetMap = `
  SELECT DISTINCT ?id
  ?from__id ?from__prefLabel ?from__lat ?from__long ?from__dataProviderUrl
  ?to__id ?to__prefLabel (SAMPLE(?tolat) AS ?to__lat) (SAMPLE(?tolong) AS ?to__long) ?to__dataProviderUrl
  (COUNT(DISTINCT ?translation) AS ?instanceCount)
  WHERE {

    <FILTER>
    graph <http://beltrans-manifestations> {
      ?translation a schema:CreativeWork ;
                   schema:translationOfWork ?original .
    }

    graph <http://beltrans-geo> { 
      ?translation schema:locationCreated ?to__id .

      ?to__id rdfs:label ?to__prefLabel ;
                schema:longitude ?to__long ;
                schema:latitude ?to__lat .
    }
    BIND(CONCAT("/place/page/", STRAFTER(STR(?to__id), "_")) AS ?to__dataProviderUrl)

    graph <http://beltrans-geo> { 
      ?original schema:locationCreated ?from__id .

      ?from__id rdfs:label ?from__prefLabel ;
                schema:longitude ?from__long ;
                schema:latitude ?from__lat .
    }
    BIND(CONCAT("/place/page/", STRAFTER(STR(?from__id), "_")) AS ?from__dataProviderUrl)

    BIND(IRI(CONCAT(STR(?from__id), "-", REPLACE(STR(?to__id), "http://ldf.fi/mmm/place/", ""))) as ?id)
    FILTER(?from__id != ?to__id)

  }
  GROUP BY ?id
  ?from__id ?from__prefLabel ?from__lat ?from__long ?from__dataProviderUrl
  ?to__id ?to__prefLabel ?to__lat ?to__long ?to__dataProviderUrl
  ORDER BY desc(?instanceCount)
`
    

export const knowledgeGraphMetadataQuery = `
  SELECT * 
  WHERE {
    ?id a sd:Dataset ;
        dct:title ?title ;
        dct:publisher ?publisher ;
        dct:rightsHolder ?rightsHolder ;
        dct:modified ?modified ;
        dct:source ?databaseDump__id .
    ?databaseDump__id skos:prefLabel ?databaseDump__prefLabel ;
                      mmm-schema:data_provider_url ?databaseDump__dataProviderUrl ;
                      dct:modified ?databaseDump__modified .
  }
`
