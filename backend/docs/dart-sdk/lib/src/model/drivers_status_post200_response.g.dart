// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'drivers_status_post200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$DriversStatusPost200Response extends DriversStatusPost200Response {
  @override
  final bool? ok;

  factory _$DriversStatusPost200Response(
          [void Function(DriversStatusPost200ResponseBuilder)? updates]) =>
      (DriversStatusPost200ResponseBuilder()..update(updates))._build();

  _$DriversStatusPost200Response._({this.ok}) : super._();
  @override
  DriversStatusPost200Response rebuild(
          void Function(DriversStatusPost200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  DriversStatusPost200ResponseBuilder toBuilder() =>
      DriversStatusPost200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is DriversStatusPost200Response && ok == other.ok;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, ok.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'DriversStatusPost200Response')
          ..add('ok', ok))
        .toString();
  }
}

class DriversStatusPost200ResponseBuilder
    implements
        Builder<DriversStatusPost200Response,
            DriversStatusPost200ResponseBuilder> {
  _$DriversStatusPost200Response? _$v;

  bool? _ok;
  bool? get ok => _$this._ok;
  set ok(bool? ok) => _$this._ok = ok;

  DriversStatusPost200ResponseBuilder() {
    DriversStatusPost200Response._defaults(this);
  }

  DriversStatusPost200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _ok = $v.ok;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(DriversStatusPost200Response other) {
    _$v = other as _$DriversStatusPost200Response;
  }

  @override
  void update(void Function(DriversStatusPost200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  DriversStatusPost200Response build() => _build();

  _$DriversStatusPost200Response _build() {
    final _$result = _$v ??
        _$DriversStatusPost200Response._(
          ok: ok,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
