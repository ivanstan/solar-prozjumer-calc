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
