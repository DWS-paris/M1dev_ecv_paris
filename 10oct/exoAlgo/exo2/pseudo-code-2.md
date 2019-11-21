ALGORITHME exo2
    data: STRING
    total: INTEGER
    result: STRING

START
    total <- 0
    data <- '123456789'

    FOR i FROM 0 TO data.LENGTH [ i <- i + 1 ] 
        total <- total + PARSEINT(data[i])
        result <- result + data[i]

        IF i !== data.LENGTH - 1 THEN
            result <- result + ' + '
        ELSE
            result <- result + ' = '
        END IF
        
    END FOR
    
    result <- result + total

    PRINT( result )
END