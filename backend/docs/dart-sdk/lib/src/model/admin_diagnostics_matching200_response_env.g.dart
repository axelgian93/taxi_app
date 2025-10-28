// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'admin_diagnostics_matching200_response_env.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AdminDiagnosticsMatching200ResponseEnv
    extends AdminDiagnosticsMatching200ResponseEnv {
  @override
  final int? MATCH_RADIUS_M;
  @override
  final int? LOCATION_MAX_AGE_MIN;

  factory _$AdminDiagnosticsMatching200ResponseEnv(
          [void Function(AdminDiagnosticsMatching200ResponseEnvBuilder)?
              updates]) =>
      (AdminDiagnosticsMatching200ResponseEnvBuilder()..update(updates))
          ._build();

  _$AdminDiagnosticsMatching200ResponseEnv._(
      {this.MATCH_RADIUS_M, this.LOCATION_MAX_AGE_MIN})
      : super._();
  @override
  AdminDiagnosticsMatching200ResponseEnv rebuild(
          void Function(AdminDiagnosticsMatching200ResponseEnvBuilder)
              updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AdminDiagnosticsMatching200ResponseEnvBuilder toBuilder() =>
      AdminDiagnosticsMatching200ResponseEnvBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AdminDiagnosticsMatching200ResponseEnv &&
        MATCH_RADIUS_M == other.MATCH_RADIUS_M &&
        LOCATION_MAX_AGE_MIN == other.LOCATION_MAX_AGE_MIN;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, MATCH_RADIUS_M.hashCode);
    _$hash = $jc(_$hash, LOCATION_MAX_AGE_MIN.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(
            r'AdminDiagnosticsMatching200ResponseEnv')
          ..add('MATCH_RADIUS_M', MATCH_RADIUS_M)
          ..add('LOCATION_MAX_AGE_MIN', LOCATION_MAX_AGE_MIN))
        .toString();
  }
}

class AdminDiagnosticsMatching200ResponseEnvBuilder
    implements
        Builder<AdminDiagnosticsMatching200ResponseEnv,
            AdminDiagnosticsMatching200ResponseEnvBuilder> {
  _$AdminDiagnosticsMatching200ResponseEnv? _$v;

  int? _MATCH_RADIUS_M;
  int? get MATCH_RADIUS_M => _$this._MATCH_RADIUS_M;
  set MATCH_RADIUS_M(int? MATCH_RADIUS_M) =>
      _$this._MATCH_RADIUS_M = MATCH_RADIUS_M;

  int? _LOCATION_MAX_AGE_MIN;
  int? get LOCATION_MAX_AGE_MIN => _$this._LOCATION_MAX_AGE_MIN;
  set LOCATION_MAX_AGE_MIN(int? LOCATION_MAX_AGE_MIN) =>
      _$this._LOCATION_MAX_AGE_MIN = LOCATION_MAX_AGE_MIN;

  AdminDiagnosticsMatching200ResponseEnvBuilder() {
    AdminDiagnosticsMatching200ResponseEnv._defaults(this);
  }

  AdminDiagnosticsMatching200ResponseEnvBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _MATCH_RADIUS_M = $v.MATCH_RADIUS_M;
      _LOCATION_MAX_AGE_MIN = $v.LOCATION_MAX_AGE_MIN;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AdminDiagnosticsMatching200ResponseEnv other) {
    _$v = other as _$AdminDiagnosticsMatching200ResponseEnv;
  }

  @override
  void update(
      void Function(AdminDiagnosticsMatching200ResponseEnvBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AdminDiagnosticsMatching200ResponseEnv build() => _build();

  _$AdminDiagnosticsMatching200ResponseEnv _build() {
    final _$result = _$v ??
        _$AdminDiagnosticsMatching200ResponseEnv._(
          MATCH_RADIUS_M: MATCH_RADIUS_M,
          LOCATION_MAX_AGE_MIN: LOCATION_MAX_AGE_MIN,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
