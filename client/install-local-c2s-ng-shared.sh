find_location="../../c2s-ng-shared/c2s-ng-shared/dist"
find_file_pattern="c2s-ng-shared-*.tgz"
local_dep_name=$(find $find_location -name $find_file_pattern)
if [ ! -z "$local_dep_name" ]; then
	echo "installing $local_dep_name"
	npm install --save $local_dep_name
else
	echo "could not find a file at: $find_location/$find_file_pattern"
fi