// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'driver_update_status200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$DriverUpdateStatus200Response extends DriverUpdateStatus200Response {
  @override
  final bool? ok;

  factory _$DriverUpdateStatus200Response(
          [void Function(DriverUpdateStatus200ResponseBuilder)? updates]) =>
      (DriverUpdateStatus200ResponseBuilder()..update(updates))._build();

  _$DriverUpdateStatus200Response._({this.ok}) : super._();
  @override
  DriverUpdateStatus200Response rebuild(
          void Function(DriverUpdateStatus200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  DriverUpdateStatus200ResponseBuilder toBuilder() =>
      DriverUpdateStatus200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is DriverUpdateStatus200Response && ok == other.ok;
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
    return (newBuiltValueToStringHelper(r'DriverUpdateStatus200Response')
          ..add('ok', ok))
        .toString();
  }
}

class DriverUpdateStatus200ResponseBuilder
    implements
        Builder<DriverUpdateStatus200Response,
            DriverUpdateStatus200ResponseBuilder> {
  _$DriverUpdateStatus200Response? _$v;

  bool? _ok;
  bool? get ok => _$this._ok;
  set ok(bool? ok) => _$this._ok = ok;

  DriverUpdateStatus200ResponseBuilder() {
    DriverUpdateStatus200Response._defaults(this);
  }

  DriverUpdateStatus200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _ok = $v.ok;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(DriverUpdateStatus200Response other) {
    _$v = other as _$DriverUpdateStatus200Response;
  }

  @override
  void update(void Function(DriverUpdateStatus200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  DriverUpdateStatus200Response build() => _build();

  _$DriverUpdateStatus200Response _build() {
    final _$result = _$v ??
        _$DriverUpdateStatus200Response._(
          ok: ok,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
