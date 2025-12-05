const perspectiveID = 'originals'
const personsPerspectiveID = 'persons'
const orgsPerspectiveID = 'organizations'
const manifestationsPerspectiveID = 'manifestations'
const workClustersPerspectiveID = 'workClusters'

export const originalProperties = `
    {
      graph <http://beltrans-originals> { ?id schema:name ?prefLabel__id . }
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
      graph <http://beltrans-originals> { ?id schema:datePublished ?datePublished . }
    }
    #
    # sourceLang
    #
    UNION
    {
      graph <http://beltrans-originals> { ?id schema:inLanguage ?sourceLang__id . }
      graph <http://master-data> { ?sourceLang__id mads:authoritativeLabel ?sourceLang__prefLabel . }
      FILTER(LANG(?sourceLang__prefLabel) = 'en')
    }
    #
    # targetLang
    #
    UNION
    {
      graph <http://beltrans-originals> { ?id schema:workTranslation ?translation . }
      graph <http://beltrans-manifestations> { ?translation schema:inLanguage ?targetLang__id . }
      graph <http://master-data> { ?targetLang__id mads:authoritativeLabel ?targetLang__prefLabel . }
      FILTER(LANG(?targetLang__prefLabel) = 'en')
    }
    #
    # ISBN-13
    #
    UNION
    {
      graph <http://beltrans-originals> { ?id bibo:isbn13 ?isbn13 . }
    }
    #
    # author
    #
    UNION
    {
      graph <http://beltrans-originals> { ?id schema:author ?author__id . }
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
      graph <http://beltrans-originals> { ?id schema:translator ?translator__id . }
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
      graph <http://beltrans-originals> { ?id marcrel:ill ?illustrator__id . }
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
      graph <http://beltrans-originals> { ?id marcrel:sce ?scenarist__id . }
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
      graph <http://beltrans-originals> { ?id marcrel:pbd ?publishingDirector__id . }
      graph <http://beltrans-contributors> { 
        ?publishingDirector__id schema:name ?publishingDirector__prefLabel ;
                                dcterms:identifier ?publishingDirectorID .
      }
      BIND(CONCAT("/${personsPerspectiveID}/page/", REPLACE(STR(?publishingDirectorID), "^.*\\\\/(.+)", "$1")) AS ?publishingDirector__dataProviderUrl)
    }

    #
    # target publisher
    #
    UNION
    {
      graph <http://beltrans-originals> { ?id marcrel:pbl ?targetPublisher__id . }
      graph <http://beltrans-contributors> {
        ?targetPublisher__id schema:name ?targetPublisher__prefLabel ;
                             dcterms:identifier ?targetPublisherID .
      }
      BIND(CONCAT("/${orgsPerspectiveID}/page/", REPLACE(STR(?targetPublisherID), "^.*\\\\/(.+)", "$1")) AS ?targetPublisher__dataProviderUrl)
    }

    #
    # translation
    #
    UNION
    {
      graph <http://beltrans-originals> { ?id schema:workTranslation ?translation__id . }
      graph <http://beltrans-manifestations> { 
        ?translation__id schema:name ?translation__prefLabel ;
                        dcterms:identifier ?translationID .
      }
      BIND(CONCAT("/${manifestationsPerspectiveID}/page/", REPLACE(STR(?translationID), "^.*\\\\/(.+)", "$1")) AS ?translation__dataProviderUrl) 
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
