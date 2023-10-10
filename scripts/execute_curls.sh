#!/bin/bash

# Assuming your text files are named 1, 2, 3, ..., 25

for i in {1..25}; do
    file_path="$i"  # Replace 'path_to_your_folder' with the actual path
    if [ -f "$file_path" ]; then
        echo "Executing curl commands from $file_path"
        response=$(curl -X POST http://127.0.0.1:30000/json_rpc -H 'content-type: application/json' -d "@$file_path" -u apollo:passwoah)
        txid=$(echo $response | jq -r '.result.txid')
        
        if [ -n "$txid" ]; then
            echo "Received txid: $txid"
            
            sleep 88
            
            # Use $txid in your next curl command here
            curl -X POST http://127.0.0.1:30000/json_rpc -H 'content-type: application/json' -d '{
                "jsonrpc": "2.0",
                "id": "1",
                "method": "transfer",
                "params": {
                    "scid":"fc8a4d12260243180c93d36816db4a173243ea1dae8618dfb4ec63f04d5b1ad4",
                    "transfers":[{"scid":"'$txid'","burn":1}],
                    "sc_rpc":[
                        {
                            "name":"entrypoint",
                            "datatype": "S",
                            "value": "ListNFT"
                        },
                        {
                            "name":"scid",
                            "datatype":"S",
                            "value":"'$txid'"
                        },
                        {
                            "name":"price",
                            "datatype":"U",
                            "value":350
                        }
                    ],
                    "ringsize":2
                }
            }' -u apollo:passwoah
        else
            echo "Error extracting txid from response."
        fi
    else
        echo "File $file_path does not exist."
    fi
done

