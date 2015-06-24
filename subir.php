<?php 
    echo 'El factorial de 8 es: ' . factorial(8), PHP_EOL;
    function factorial($n) {
        if($n == 1) {
            return 1;
        }
        return $n * factorial($n - 1);
    }
?>