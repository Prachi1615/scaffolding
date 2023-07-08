#!/bin/bash

# The name of the Yeoman generator
generator_name="springboot"

# The list of prompt values
serviceName=(
  "CUFXPartyAssociationDataModelAndServices"
  "ab"
)
groupdId=(
  "finx.cufx"
  "finx.cufx"
)
version=(
  "1.0-SNAPSHOT"
  "1.0-SNAPSHOT"
)
springBootVersion=(
  "2.7.12"
  "2.7.12"
)
buildTool=(
  "Maven"
  "Maven"
)

for i in {0..1} 
do
  serviceName=${serviceName[$i]}
  groupdId=${groupdId[$i]}
  version=${version[$i]}
  springBootVersion=${springBootVersion[$i]}
  buildTool=${buildTool[$i]}

  yo $generator_name --serviceName=${serviceName[$i]} --groupdId=${groupdId[$i]} --version=${version[$i]} --springBootVersion=${springBootVersion[$i]} --buildTool=${buildTool[$i]}

done