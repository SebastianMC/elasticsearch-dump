elasticdump
==================

For full original usage instuctions please refer to https://github.com/taskrabbit/elasticsearch-dump/blob/master/README.md  

This fork of the elasticdump includes the following additions:
* switched from GET to POST requests (ElasticSearch behind a proxy which doesn't accept GET with a body)
* fixed kbn-version in HTTP header to 5.1.2
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
                    
--exportFromDate
                    Specify a date of a day in format YYYY-MM-DD (e.g. 2017-07-15)
                    Based on the date the ElasticSearch indexes to export from will
                    be determined automatically.
                    This parameter requires the --input-index-pattern to be supplied.
                    At the same time, the --input-index parameter is ignored
                    
                    The export will read from one or more indexes
                    
                    WARNING! this parameter used together with --searchBody or --searchBodyFile will
                    attempt to merge the search queries, the one from commandline with the one for date filtering.
                    If the query from commandline is in format different than { "query":{ "bool": ...
                    it will be ignored and overwritten by the date filtering.
                    
--input-index-pattern
                    Only applicable together with --exportFromDate
                    Specify a base name for the ElasticSearch index to scan
                    The wildcard '*' will be appended automatically when querying ElasticSearch
                    
--appendOutput
                    For file output, if the parameter is =true, the logs will be appended to the output file
```

