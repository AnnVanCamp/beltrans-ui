const perspectiveID = 'manifestations'

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
    # datePublished
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id schema:datePublished ?datePublished . }
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
    # subset
    #
    UNION
    {
      graph <http://beltrans-manifestations> { ?id schema:isPartOf btid:beltransCorpus . }
      BIND(IF(EXISTS{?id schema:isPartOf btid:beltransCorpus}, 'Yes', 'No') AS ?beltransCorpus)
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
      graph <http://beltrans-contributors> { ?author__id schema:name ?author__prefLabel . }
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
    UNION
    {
      ?id ^frbroo:R16_initiated/(mmm-schema:carried_out_by_as_possible_author|mmm-schema:carried_out_by_as_author) ?author__id .
      ?author__id skos:prefLabel ?author__prefLabel .
      BIND(CONCAT("/actors/page/", REPLACE(STR(?author__id), "^.*\\\\/(.+)", "$1")) AS ?author__dataProviderUrl)
    }
    UNION
    {
      ?id ^frbroo:R19_created_a_realisation_of/frbroo:R17_created ?expression__id .
      ?expression__id skos:prefLabel ?expression__prefLabel .
      OPTIONAL {
        ?expression__id crm:P72_has_language ?language__id .
        ?expression__id dct:source ?language__source__id .
        ?language__source__id skos:prefLabel ?language__source__prefLabel .
        ?language__id skos:prefLabel ?language__prefLabel .
      }
      BIND(CONCAT("/expressions/page/", REPLACE(STR(?expression__id), "^.*\\\\/(.+)", "$1")) AS ?expression__dataProviderUrl)
    }
    UNION
    {
      ?id ^mmm-schema:manuscript_work/^crm:P108_has_produced/crm:P4_has_time-span ?productionTimespan__id .
      ?productionTimespan__id skos:prefLabel ?productionTimespan__prefLabel .
      ?productionTimespan__id dct:source ?productionTimespan__source__id .
      ?productionTimespan__source__id skos:prefLabel ?productionTimespan__source__prefLabel .
      OPTIONAL { ?productionTimespan__id crm:P82a_begin_of_the_begin ?productionTimespan__start }
      OPTIONAL { ?productionTimespan__id crm:P82b_end_of_the_end ?productionTimespan__end }
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
