package com.example.lab.projects.configuration;

import java.nio.ByteBuffer;
import java.util.UUID;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.data.r2dbc.convert.R2dbcCustomConversions;
import org.springframework.data.r2dbc.dialect.MySqlDialect;

@Configuration
public class MySqlR2dbcConfig {
    @Bean
    public R2dbcCustomConversions customConversions() {
        return R2dbcCustomConversions.of(
                MySqlDialect.INSTANCE,
                new UuidToBytesConverter(),
                new BytesToUuidConverter(),
                new LongToUuidConverter());
    }

    static class UuidToBytesConverter implements Converter<UUID, byte[]> {
        @Override
        public byte[] convert(UUID source) {
            var bb = ByteBuffer.wrap(new byte[16]);
            bb.putLong(source.getMostSignificantBits());
            bb.putLong(source.getLeastSignificantBits());
            return bb.array();
        }
    }

    static class BytesToUuidConverter implements Converter<byte[], UUID> {
        @Override
        public UUID convert(byte[] source) {
            var bb = ByteBuffer.wrap(source);
            var firstLong = bb.getLong();
            var secondLong = bb.getLong();
            return new UUID(firstLong, secondLong);
        }
    }

    static class LongToUuidConverter implements Converter<Long, UUID> {
        @Override
        public UUID convert(Long source) {
            // FIXME: source is zero (0L) after repository.save(..) -- why Long and not Byte[]? why zero?
            return UUID.randomUUID();
        }
    }
}
