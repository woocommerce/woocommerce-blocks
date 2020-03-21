# NOTE: Plugins go inside /usr/src/wordpress/wp-content/plugins
# They are copied at runtime https://github.com/docker-library/wordpress/issues/341

FROM alpine/git as gitStage
CMD echo "Cloning WooCommerce..."
RUN git clone --depth 1 "https://github.com/woocommerce/woocommerce.git" /woocommerce

FROM wordpress:latest
RUN apt-get update && \
	apt-get -y install subversion unzip wget

CMD echo "Installing WooCommerce..."
RUN wget -O /tmp/woocommerce.zip https://downloads.wordpress.org/plugin/woocommerce.zip \
	&& unzip -q /tmp/woocommerce.zip -d /usr/src/wordpress/wp-content/plugins
COPY --from=gitStage /woocommerce/tests /usr/src/wordpress/wp-content/plugins/woocommerce/tests

CMD echo "Installing tests..."
COPY install-wp-tests-docker.sh /usr/local/bin/dockerInit
RUN chmod +x /usr/local/bin/dockerInit
RUN dockerInit

# Keep container active
CMD ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]
