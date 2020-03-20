FROM wordpress:latest

# Install packages
RUN apt-get update && \
	apt-get -y install subversion unzip

CMD echo "Installing tests..."

COPY install-wp-tests-docker.sh /usr/local/bin/dockerInit
RUN chmod +x /usr/local/bin/dockerInit
RUN dockerInit

CMD tail -f /dev/null
