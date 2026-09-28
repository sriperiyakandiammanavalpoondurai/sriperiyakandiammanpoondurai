$base64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+hHgAFgwJlphLZAAAAABJRU5ErkJggg=="
$bytes = [Convert]::FromBase64String($base64)
$rows = @('05','11','21','22','25','28','30','34','37')
foreach ($row in $rows) {
    $path = "D:\sriperiyakandiammanpoondurai-main\sriperiyakandiammanpoondurai-main\assets\pusari\_$row.jpg"
    [IO.File]::WriteAllBytes($path, $bytes)
    echo "Created _$row.jpg ($($bytes.Length) bytes)"
}