<?php

    header('Content-Type: application/json');

    $input = filter_input_array(INPUT_POST);
    $data = getData($input);

    echo json_encode($data);

    function getData($input) {
        define('__ROOT__', dirname(dirname(__FILE__)));
        require_once(__ROOT__.'/php/db.php');

        $action = $input['input'][0];
        $id = $input['input'][1];
        $lang = $input['input'][2];
        $query = "";
        $data = array();

        switch ($action) {
            case "get_content":
                $query = "SELECT webfs_file_".$lang.".content_id, content_".$lang.".content FROM `webfs_file_".$lang."` INNER JOIN content_".$lang." ON webfs_file_".$lang.".content_id=content_".$lang.".id  WHERE webfs_file_".$lang.".id=".$id;
                break;
            case "get_parent":
                $query = "SELECT parent FROM `webfs_tree` WHERE child=".$id;
                break;
            case "get_folders":
                $query = "SELECT webfs_tree.child, webfs_names_".$lang.".name FROM webfs_tree INNER JOIN webfs_names_".$lang." ON webfs_tree.child=webfs_names_".$lang.".id WHERE webfs_tree.parent=".$id;
                break;
            case "get_files":
                $query = "SELECT webfs_files.file_id, webfs_file_".$lang.".name FROM webfs_files INNER JOIN webfs_file_".$lang." ON webfs_files.file_id=webfs_file_".$lang.".id WHERE webfs_files.folder_id=".$id;
                break;
        }        
    
        $result = $mysqli->query($query);

        if ($result) {
            while ($row = $result->fetch_object()) {
                switch ($action) {
                    case "get_content":
                        array_push($data, ['content' => $row->content]); 
                        break;
                    case "get_parent":
                        array_push($data, ['parent' => $row->parent]);
                        break;
                    case "get_folders":
                        array_push($data, [$row->child => $row->name]);
                        break;
                    case "get_files":
                        array_push($data, [$row->file_id => $row->name]);
                        break;
                }            
            }

            $result->close();
        }

        return $data;
    }
