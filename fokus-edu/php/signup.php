<?php 
    
    session_start();
    include_once "config.php";
    $fname = mysqli_real_escape_string($conn, $_POST['fname']);
    $lname = mysqli_real_escape_string($conn, $_POST['lname']);
    $email =  mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    if(!empty($fname) && !empty($lname) && !empty($email) && !empty($password) ){
        //let's check if user email is valid or not
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){ //if email is valid
            //checking if email already exists in database
            $sql = mysqli_query($conn, "SELECT email FROM users WHERE email = '{$email}' ");
            if(mysqli_num_rows($sql) > 0){ //if email already exists
                echo "$email already dey in use!" ;
            }
            else{

                //let's check user upload file or not
                if(isset($_FILES['image'])){ //if file is uploaded

                     $img_name = $_FILES['image']['name']; //getting user uploaded image name
                     $tmp_name = $_FILES['image']['tmp_name']; // this temp name is used to save/move file in our folder

                     //explode image and get the lattest extension like jpg png
                     $img_explode = explode('.', $img_name);
                     $img_ext = end($img_explode); //here we get the extension of a user uploaded img file

                     $extension = ['png', 'jpeg', 'jpg']; //these are some valid img ext and we'll store them in an array

                     if(in_array($img_ext, $extension) === true) { //if user uploaded img ext is matched with any array extensions
                        $time = time(); //this will reyurn current time
                                        //when uploading user img to our folder we rename the file with current time
                                        //so all img will have a unique name
                        //move the user uploaded image to our particular folder
                        $new_img_name = $time.$img_name; 

                       if(move_uploaded_file($tmp_name, "images/" .$new_img_name)){ //if user uploaded image moves to our folder successfully
                            $status = "Online"; //once user signed up then his status will be active now
                            $random_id = rand(time(), 10000000); //creating random id for user

                            //let's insert all user data inside table
                            $sql2 = mysqli_query($conn, "INSERT INTO users (unique_id, fname, lname, email, password, img, status) VALUES ({$random_id}, '{$fname}', '{$lname}', '{$email}', '{$password}', '{$new_img_name}', '{$status}' )");

                            if($sql2){ //if this data is inserted
                                $sql3= mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");

                                if(mysqli_num_rows($sql3) > 0){
                                    $row = mysqli_fetch_assoc($sql3);
                                    $_SESSION['unique_id'] = $row['unique_id']; //using this session we used user unique_id in other php file
                                    echo "success";
                                }
                                else{
                                    echo "This email is non existent my broda";
                                }

                            }
                            else{
                                echo "wetin you dey do sef? try again";
                            }
                       }
                     }
                     else{
                        echo "please dey use this kind image file jpeg, jpg, png";
                     }
                }
                else{
                    echo "You don forget for uplaod your profile picture";
                }
            }
        }
        else{
            echo "$email is not a valid email";
        }
    }else{
        echo "Broda come back and fill this form";
    }


?>