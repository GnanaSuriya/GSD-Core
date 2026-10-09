import urllib.request
import re
import json

req = urllib.request.Request(
    'https://www.youtube.com/results?search_query=A2D+Channel',
    headers={'User-Agent': 'Mozilla/5.0'}
)
html = urllib.request.urlopen(req).read().decode('utf-8')

match = re.search(r'var ytInitialData = (\{.*?\});</script>', html)
if match:
    data = json.loads(match.group(1))
    videos = []
    
    def find_videos(obj):
        if isinstance(obj, dict):
            if 'videoRenderer' in obj:
                v = obj['videoRenderer']
                owner = v.get('ownerText', {}).get('runs', [{}])[0].get('text', '')
                if 'A2D' in owner or 'a2d' in owner.lower():
                    vid = v.get('videoId')
                    title = v.get('title', {}).get('runs', [{}])[0].get('text')
                    thumb = v.get('thumbnail', {}).get('thumbnails', [{}])[-1].get('url')
                    if vid and title and thumb:
                        videos.append({"id": vid, "title": title, "thumbnail": thumb.split('?')[0]})
            for k, val in obj.items():
                find_videos(val)
        elif isinstance(obj, list):
            for item in obj:
                find_videos(item)
                
    find_videos(data)
    
    seen = set()
    final = []
    for v in videos:
        if v['id'] not in seen:
            seen.add(v['id'])
            final.append(v)
            if len(final) == 6:
                break
                
    with open('videos.json', 'w', encoding='utf-8') as f:
        json.dump(final, f, indent=2)
