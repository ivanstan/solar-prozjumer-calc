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
        
        [aria-hidden="true"] {
            display: none;
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
