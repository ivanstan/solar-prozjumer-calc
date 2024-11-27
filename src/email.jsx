export function reportEmail(body) {
  return `
  <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .backdrop {
            padding: 40px 0 20px 0;
            background-color: #eeeeee;
        }

        .column {
            /*width: 600px;*/
            /*margin: auto;*/
            background-color: #fff;
        }

        .header {
            padding: 20px;
            text-align: center;
        }

        .content {
            margin: 20px;
            padding: 20px;
        }

        h1 {
            font-size: 3em
        }
        
        .MuiInputBase-root svg,
        .MuiInputBase-root fieldset {
            display: none;
        }
        
        table {
          margin-bottom: 20px;
        }
        
        .blue {
          background-color: #fcf2f2;
          border-color: #fcf2f2;
        }
        
        .red {
          background-color: #fcf2f2;
          border-color: #fcf2f2;
        }
        
        .green {
          background-color: #fcf2f2;
          border-color: #fcf2f2;
        }
        
        .primary {
            background-color: #e61d1d;
            color: #fff;
        }
        
        .secondary {
            background-color: #fadcda;
        }
        
        /* Hides elements for non-mobile devices */
        .row-non-mobile {
            display: none;
        }
        
        @media (max-width: 768px) {
            .row-non-mobile {
                display: table-row; /* Adjust if needed, e.g., inline, flex, grid */
            }
        }
        
        /* Displays elements for non-mobile (desktop) devices */
        .cell-mobile-hidden {
            display: table-cell; /* Adjust if needed, e.g., block, flex, inline */
        }
        
        @media (max-width: 768px) {
            .cell-mobile-hidden {
                display: none;
            }
        }

    </style>
</head>
<body>
<div class="backdrop">
    <div class="column">
        <div class="header">

        </div>
        <div class="content">
            ${body}
        </div>
    </div>
</div>

</body>
</html>
`;
}
