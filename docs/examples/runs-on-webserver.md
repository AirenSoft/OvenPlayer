---
description: This example shows you how to build a simple web server using Nginx.
---

# Run-on WebServer



{% hint style="success" %}
If you cannot install a web server in your environment, please use our demo player.

· OvenPlayer for testing without TLS: [http://demo.ovenplayer.com](http://demo.ovenplayer.com)

· OvenPlayer for testing with TLS: [https://demo.ovenplayer.com](https://demo.ovenplayer.com)
{% endhint %}

### Install Nginx

All descriptions are based on CentOS 7. If you are using a different OS, please see the [Nginx tutorials](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/).

```
sudo yum install epel-release
sudo yum install nginx
```

### Go to the Nginx root folder

```
cd /usr/share/nginx/html
```

### Download OvenPlayer

```
git clone https://github.com/AirenSoft/OvenPlayer.git
```

### Access from your browser

```
http://YOUR_IP/OvenPlayer/docs/demo.html
```

![](<../.gitbook/assets/demo_player.png>)
