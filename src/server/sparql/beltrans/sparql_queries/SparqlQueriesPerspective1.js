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
      graph <http://beltrans-manifestations> { ?id schema:inLanguage ?targetLang__id . }
      graph <http://master-data> { ?targetLang__id mads:authoritativeLabel ?targetLang__prefLabel . }
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
