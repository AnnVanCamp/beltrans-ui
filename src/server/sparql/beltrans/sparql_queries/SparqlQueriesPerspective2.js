const perspectiveID = 'persons'

export const personProperties = `
    {
      graph <http://beltrans-contributors> { ?id schema:name ?prefLabel__id . }
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    #
    # ISNI
    #
    {
      graph <http://beltrans-contributors> { 
        ?id bf:identifiedBy ?isniEntity .

        ?isniEntity a bf:Identifier ;
                    rdfs:label "ISNI" ;
                    rdf:value ?isni__prefLabel . 
      }
      BIND(CONCAT("https://isni.org/", ?isni__prefLabel) AS ?isni__dataProviderUrl)
    }
    #
    # KBR
    #
    UNION
    {
      graph <http://beltrans-contributors> { 
        ?id bf:identifiedBy ?kbr__id .

        ?kbr__id a bf:Identifier ;
                    rdfs:label "KBR" ;
                    rdf:value ?kbr__prefLabel . 
      }
      BIND(CONCAT("https://uurl.kbr.be/aut/", ?kbr__prefLabel) AS ?kbr__dataProviderUrl)
    }

    #
    # family name
    #
    UNION
    {
      graph <http://beltrans-contributors> { ?id schema:familyName ?familyName . }
    }
    #
    # given name
    #
    UNION
    {
      graph <http://beltrans-contributors> { ?id schema:givenName ?givenName . }
    }
    #
    # gender
    #
    UNION
    {
      graph <http://beltrans-contributors> { ?id schema:gender ?gender__id . }
      graph <http://master-data> { ?gender__id rdfs:label ?gender__prefLabel . }
      FILTER(LANG(?gender__prefLabel) = 'en')
    }
    #
    # nationality
    #
    UNION
    {
      graph <http://beltrans-contributors> { ?id schema:nationality ?nationality__id . }
      graph <http://master-data> { ?nationality__id skos:prefLabel ?nationality__prefLabel . }
      #FILTER(LANG(?gender) = 'en')
    }
    #
    # birthDate
    #
    UNION
    {
      graph <http://beltrans-contributors> { ?id schema:birthDate ?birthDate . }
    }
    #
    # deathDate
    #
    UNION
    {
      graph <http://beltrans-contributors> { ?id schema:deathDate ?deathDate . }
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
