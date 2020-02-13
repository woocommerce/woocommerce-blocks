FROM wordpress:cli-php7.4

USER root

COPY wait-for-it.sh /usr/local/bin/wait-for-it
RUN chown xfs:xfs /usr/local/bin/wait-for-it && \
    chmod +x /usr/local/bin/wait-for-it

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chown xfs:xfs /usr/local/bin/entrypoint.sh && \
    chmod +x /usr/local/bin/entrypoint.sh

RUN chown xfs:xfs /home/www-data

USER xfs
RUN mkdir /home/www-data/.wp-cli && echo "path: /var/www/html" > /home/www-data/.wp-cli/config.yml
USER root
ENTRYPOINT ["entrypoint.sh"]
