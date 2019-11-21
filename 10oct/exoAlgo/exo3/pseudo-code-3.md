ALGORITHME exo3
    data: ARRAY<INTEGER>
    total: INTEGER
    min: INTEGER
    max: INTEGER

START
    total <- 0
    data <- [65, 2, 87, 30, 16, 5, 14, 67, 56, 8]

    FOR i FROM 0 TO data.LENGTH [ i <- i + 1 ] 
        total <- total + data[i]

        IF i === 0 THEN
            min <- data[i]
            max <- data[i]
        ELSE IF data[i] < min THEN
            min <- data[i]
        ELSE IF data[i] > max THEN
            max <- data[i]
        END IF
        
    END FOR
  
    PRINT('Moyenne : ' + (total / data.LENGTH) + ' - Min. : ' + min + ' - Max. : ' + max )
END