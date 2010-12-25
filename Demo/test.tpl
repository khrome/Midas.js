<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "DTD/xhtml1-strict.dtd">
<html>
<head>
   <title>{$title_text}</title>
   <meta http-equiv="content-type" content="text/html; charset=utf-8" />
</head>
 
<body> {* This is a little comment that won't be visible in the HTML source *}
 
{$body_html}
{if $something}
    I found something!
{else}
    There's nothing here!
{/if}
<table>
{foreach from=$table_items key=index item=label}
    <tr>
        <td>{$index}</td><td>{$label}</td>
    </tr>
{/foreach}
</table>
</body><!-- this is a little comment that will be seen in the HTML source -->
</html>