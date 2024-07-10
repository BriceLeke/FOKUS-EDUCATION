<?php 
    $conn = mysqli_connect("localhost", "root", "", "fokus");
    if(!$conn){
        echo "Database connected" . mysqli_connect_error();
    }
    
?>