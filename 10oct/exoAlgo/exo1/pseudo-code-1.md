ALGORITHME exo1
    result: STRING
    data: ARRAY<INTEGER>

START
    result <- ''
    data <- [65, 2, 87, 30, 16, 5, 14, 67, 56, 8]

    FOR i FROM 0 TO data.LENGTH [ i <- i + 1 ] 
        
        IF data[i] % 2 THEN
            result <- result + data[i] + ' = pair'
        ELSE
            result <- result + data[i] + ' != pair'
        END IF
        
    END FOR
  
    PRINT(result)
END