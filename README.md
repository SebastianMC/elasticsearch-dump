elasticdump
==================

For full original usage instuctions please refer to https://github.com/taskrabbit/elasticsearch-dump/blob/master/README.md  

This fork of the elasticdump includes the following additions:
* switched from GET to POST requests (ElasticSearch behind a proxy which doesn't accept GET with a body)
* fixed kbn-version in HTTP header to 4.5.4
* Added scripts to allow execution of the commands without building the package. Scripts copied from npm distribution of original package and adjusted to match the paths
* Added new output transport 'keyvaluefile' by cloning the 'file' transport. The intention is to keep 'file' generating JSON and have the 'keyvaluefile' generate the hybrid CSV-JSON formal.
* Added default sorting by @timestamp, if not specified explicitly in query
* Added ability to read ElasticSearch query from a json file specified in --searchBodyFile (as an alternative to --searchBody)


## Installing

Please refer to the relevant confluence page for installation instructions

## Use

## Additional Options added in this fork



```

--searchBodyFile
                    Provide a json file with the the ES query
                    This an alternative to --searchBody oprion, the only difference is
                    that the query is read from specified JSON file instead of
                    explicit parameter in command line
                    
```

